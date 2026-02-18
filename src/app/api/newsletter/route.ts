import { NextResponse } from 'next/server';

import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

type NewsletterBody = {
  email?: string;
  /**
   * Honeypot field: bots often fill hidden inputs. If it's non-empty,
   * we pretend success but do nothing.
   */
  company?: string;
};

function normalizeEmail(input: string) {
  return input.trim().toLowerCase();
}

function isValidEmail(email: string) {
  if (email.length < 3 || email.length > 320) return false;
  // Pragmatic validation; keep it permissive.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: NewsletterBody;
  try {
    body = (await req.json()) as NewsletterBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const honeypot = typeof body.company === 'string' ? body.company : '';
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const rawEmail = body.email;
  if (typeof rawEmail !== 'string') {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  const email = normalizeEmail(rawEmail);
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const origin =
    req.headers.get('origin') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  const subject = "Inscription newsletter - Cœur d'Occitanie";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #2C2416;">
      <h2 style="margin: 0 0 12px;">Bienvenue !</h2>
      <p style="margin: 0 0 12px;">
        Merci, ton email est bien enregistré.
      </p>
      <p style="margin: 0 0 12px;">
        On te prévient dès qu'un nouvel événement arrive et quand les précommandes ouvrent.
      </p>
      <p style="margin: 16px 0 0; font-size: 12px; color: #6B5D4F;">
        Site : ${origin}
      </p>
    </div>
  `.trim();

  try {
    const result = await sendEmail({ to: email, subject, html });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.reason },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error('Newsletter send error:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'Unable to send confirmation email',
      },
      { status: 500 }
    );
  }

  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO;
  if (typeof notifyTo === 'string' && notifyTo.trim().length > 0) {
    const when = new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date());

    const notifyHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #2C2416;">
        <h3 style="margin: 0 0 12px;">Nouvelle inscription newsletter</h3>
        <p style="margin: 0 0 12px;"><strong>Email :</strong> ${email}</p>
        <p style="margin: 0; font-size: 12px; color: #6B5D4F;">${when}</p>
      </div>
    `.trim();

    // Don't fail the whole request if admin notification can't be sent.
    try {
      await sendEmail({
        to: notifyTo.trim(),
        subject: 'Nouvelle inscription newsletter',
        html: notifyHtml,
      });
    } catch (err) {
      console.warn('Newsletter notify error:', err);
    }
  }

  return NextResponse.json({ ok: true });
}

