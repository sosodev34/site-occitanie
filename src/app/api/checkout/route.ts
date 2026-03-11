import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { boxes } from '@/data/boxes';

export const runtime = 'nodejs';

type CheckoutItem = {
  boxId: string;
  quantity: number;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY' },
      { status: 500 }
    );
  }

  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const items = (payload as any)?.items as CheckoutItem[] | undefined;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items' }, { status: 400 });
  }

  const makeAbsoluteUrl = (pathOrUrl: string) => {
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
      return pathOrUrl;
    }
    return `${origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
  };

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const boxId = item?.boxId;
    const quantity = item?.quantity;

    if (typeof boxId !== 'string' || boxId.length === 0) {
      return NextResponse.json({ error: 'Invalid boxId' }, { status: 400 });
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const box = boxes.find((b) => b.id === boxId);
    if (!box) {
      return NextResponse.json(
        { error: `Unknown product: ${boxId}` },
        { status: 400 }
      );
    }

    line_items.push({
      quantity,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(box.price * 100),
        product_data: {
          name: box.name,
          description: box.description,
          images: [makeAbsoluteUrl(box.image)],
        },
      },
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      locale: 'auto',
      // No shipping: pickup during the event.
      shipping_address_collection: undefined,
      success_url: `${origin}/?stripe_success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?stripe_cancel=1`,
      metadata: {
        items: JSON.stringify(items.map((i) => ({ boxId: i.boxId, quantity: i.quantity }))),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe session missing url' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Unable to create Stripe checkout session' },
      { status: 500 }
    );
  }
}
