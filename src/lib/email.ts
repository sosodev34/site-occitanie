type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
};

type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; skipped: true; reason: string };

/**
 * Minimal email sender.
 *
 * Currently supports Resend via HTTP API to avoid adding extra deps.
 * Configure:
 * - RESEND_API_KEY
 * - EMAIL_FROM (e.g. "Cœur d'Occitanie <onboarding@resend.dev>")
 */
export async function sendEmail(args: SendEmailArgs): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return {
      ok: false,
      skipped: true,
      reason: 'Missing RESEND_API_KEY or EMAIL_FROM',
    };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: args.to,
      subject: args.subject,
      html: args.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend API error: HTTP ${res.status} ${body}`);
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null;
  return { ok: true, id: data?.id };
}

