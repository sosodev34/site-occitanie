import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { boxes } from '@/data/boxes';
import { events } from '@/data/events';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

type ConfirmBody = {
  sessionId?: string;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

function formatEur(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY' },
      { status: 500 }
    );
  }

  let body: ConfirmBody;
  try {
    body = (await req.json()) as ConfirmBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const sessionId = body?.sessionId;
  if (typeof sessionId !== 'string' || sessionId.length === 0) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error('Stripe retrieve session error:', err);
    return NextResponse.json(
      { error: 'Unable to retrieve checkout session' },
      { status: 500 }
    );
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    );
  }

  const customerEmail =
    session.customer_details?.email || session.customer_email || undefined;
  const customerName = session.customer_details?.name || undefined;

  if (!customerEmail) {
    return NextResponse.json(
      { error: 'Missing customer email' },
      { status: 400 }
    );
  }

  const rawItems = session.metadata?.items;
  let items: Array<{ boxId: string; quantity: number }> = [];
  if (typeof rawItems === 'string' && rawItems.length > 0) {
    try {
      const parsed = JSON.parse(rawItems) as unknown;
      if (Array.isArray(parsed)) {
        items = parsed
          .map((i) => ({
            boxId: (i as any)?.boxId,
            quantity: (i as any)?.quantity,
          }))
          .filter(
            (i) =>
              typeof i.boxId === 'string' &&
              typeof i.quantity === 'number' &&
              Number.isInteger(i.quantity) &&
              i.quantity > 0
          );
      }
    } catch {
      // ignore
    }
  }

  if (items.length === 0) {
    return NextResponse.json(
      { error: 'Missing items metadata on session' },
      { status: 400 }
    );
  }

  const boxById = new Map(boxes.map((b) => [b.id, b] as const));
  const lines = items
    .map((i) => {
      const box = boxById.get(i.boxId);
      if (!box) return null;
      return {
        box,
        quantity: i.quantity,
        subtotal: box.price * i.quantity,
      };
    })
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  if (lines.length === 0) {
    return NextResponse.json(
      { error: 'No valid items for current catalog' },
      { status: 400 }
    );
  }

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);

  // Pickup info: try to match by date, otherwise omit.
  const pickupDate = lines[0]?.box.availableDate;
  const pickupEvent = pickupDate
    ? events.find((e) => e.date === pickupDate)
    : undefined;

  const subject = "Confirmation de précommande - Cœur d'Occitanie";

  const htmlLines = lines
    .map(
      (l) =>
        `<tr>
          <td style="padding: 8px 0;">${l.box.name} × ${l.quantity}</td>
          <td style="padding: 8px 0; text-align:right;">${formatEur(l.subtotal)}</td>
        </tr>`
    )
    .join('');

  const pickupHtml = pickupEvent
    ? `<p style="margin: 16px 0 0;">
        <strong>Retrait :</strong> ${pickupEvent.date} • ${pickupEvent.time}<br />
        <strong>Lieu :</strong> ${pickupEvent.location}
      </p>`
    : pickupDate
      ? `<p style="margin: 16px 0 0;"><strong>Retrait :</strong> ${pickupDate}</p>`
      : '';

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #2C2416;">
      <h2 style="margin: 0 0 12px;">Précommande confirmée</h2>
      <p style="margin: 0 0 16px;">
        ${customerName ? `Bonjour ${customerName},` : 'Bonjour,'}
        <br />
        Merci ! Votre paiement a été confirmé et votre précommande est enregistrée.
      </p>

      <table style="width:100%; border-collapse: collapse;">
        <tbody>
          ${htmlLines}
          <tr>
            <td style="padding: 12px 0; border-top: 1px solid rgba(217,119,87,0.2);"><strong>Total</strong></td>
            <td style="padding: 12px 0; border-top: 1px solid rgba(217,119,87,0.2); text-align:right;"><strong>${formatEur(total)}</strong></td>
          </tr>
        </tbody>
      </table>

      ${pickupHtml}

      <p style="margin: 16px 0 0; font-size: 12px; color: #6B5D4F;">
        Référence : ${session.id}
      </p>
    </div>
  `.trim();

  let emailStatus: 'sent' | 'skipped' | 'failed' = 'failed';
  let emailError: string | undefined;
  try {
    const result = await sendEmail({ to: customerEmail, subject, html });
    if (result.ok) {
      emailStatus = 'sent';
    } else {
      emailStatus = 'skipped';
      emailError = result.reason;
      console.warn('Email skipped:', result.reason);
    }
  } catch (err) {
    console.error('Email send error:', err);
    emailStatus = 'failed';
    emailError = err instanceof Error ? err.message : 'Unknown error';
  }

  return NextResponse.json({
    ok: true,
    emailStatus,
    emailError,
    to: customerEmail,
  });
}
