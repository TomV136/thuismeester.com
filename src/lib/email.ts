/**
 * Email helper (src/lib/email.ts)
 *
 * Centralises the Resend setup so both API routes (aanmelden + contact) read
 * the same environment variables in one place rather than each route reading
 * them separately.
 *
 * getMailer() returns null when RESEND_API_KEY is not configured. Callers
 * should treat null as "email is disabled" — log a warning and carry on rather
 * than crash. This lets the app run locally without email credentials.
 *
 * Environment variables:
 *   RESEND_API_KEY → Resend API key (required to actually send mail)
 *   MAIL_FROM      → "From" address shown in emails (optional, has a default)
 *   NOTIFY_EMAIL   → owner address that receives internal notifications
 */

import { Resend } from "resend";

export interface Mailer {
  resend: Resend;
  from: string;       // "From" address shown in emails
  notifyTo?: string;  // owner's address for internal notifications
}

export function getMailer(): Mailer | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  return {
    resend: new Resend(apiKey),
    from: process.env.MAIL_FROM ?? "Thuismeester <noreply@thuismeester.nl>",
    notifyTo: process.env.NOTIFY_EMAIL,
  };
}
