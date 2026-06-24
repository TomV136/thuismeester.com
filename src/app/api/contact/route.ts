/**
 * API Route: POST /api/contact (src/app/api/contact/route.ts)
 *
 * This is a SERVER-SIDE file — it never runs in the browser. Next.js turns
 * any file named route.ts inside the api/ folder into an HTTP endpoint.
 *
 * What this endpoint does when it receives a POST request:
 *   1. Validates the incoming data (returns 400 if invalid)
 *   2. Emails the message to the site owner via Resend
 *   3. Returns 200 OK
 *
 * Why email and not a file? An earlier version appended messages to a local
 * file (data/contactberichten.json). That works locally but NOT on Vercel:
 * its serverless filesystem is read-only/ephemeral, so those writes vanish
 * between requests and the messages are lost. Emailing the owner is the
 * reliable equivalent — and it mirrors how the sign-up route already works.
 *
 * Environment variables (set in the Vercel dashboard or .env.local):
 *   RESEND_API_KEY → Resend API key (without it the message is only logged)
 *   NOTIFY_EMAIL   → owner address that receives contact messages
 *   MAIL_FROM      → "From" address shown in emails (optional)
 */

import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { getMailer } from "@/lib/email";

/**
 * ContactPayload — TypeScript interface for the expected request body.
 * The ? marks onderwerp as optional (the form's subject dropdown is not required).
 */
interface ContactPayload {
  naam:       string;
  email:      string;
  onderwerp?: string;  // optional — user may not select a topic
  bericht:    string;  // required — must be at least 10 characters
}

/**
 * validatePayload — checks that the incoming data is valid before sending.
 *
 * Returns a discriminated union:
 *   { valid: true,  data: ContactPayload }  → data is clean, proceed
 *   { valid: false, message: string }       → return 400 with this message
 *
 * Server-side validation is essential — it can't be bypassed the way the
 * browser's HTML validation can.
 */
function validatePayload(body: unknown): { valid: true; data: ContactPayload } | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Ongeldig verzoek." };
  }

  const b = body as Record<string, unknown>;

  if (!b.naam || typeof b.naam !== "string" || b.naam.trim().length < 2) {
    return { valid: false, message: "Vul een geldige naam in." };
  }
  // Email format check shared with the sign-up route (see src/lib/validation.ts)
  if (!b.email || typeof b.email !== "string" || !isValidEmail(b.email)) {
    return { valid: false, message: "Vul een geldig e-mailadres in." };
  }
  if (!b.bericht || typeof b.bericht !== "string" || b.bericht.trim().length < 10) {
    return { valid: false, message: "Schrijf een bericht van minimaal 10 tekens." };
  }

  // Return cleaned data — trim whitespace, lowercase email
  return {
    valid: true,
    data: {
      naam:      b.naam.trim(),
      email:     b.email.toLowerCase().trim(),
      onderwerp: b.onderwerp ? String(b.onderwerp).trim() : undefined,
      bericht:   b.bericht.trim(),
    },
  };
}

/**
 * POST handler — called by Next.js when the endpoint receives a POST request.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body sent by ContactForm.tsx
    const body = await req.json();

    // Validate — return 400 if anything is missing or wrong
    const result = validatePayload(body);
    if (!result.valid) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    const { data } = result;

    /**
     * Email the message to the owner.
     *
     * getMailer() (src/lib/email.ts) returns null when RESEND_API_KEY is not
     * configured. In that case we log the message instead of crashing, so the
     * form still "works" in local development.
     *
     * replyTo: data.email means the owner can hit "Reply" and answer the
     * sender directly.
     */
    const mailer = getMailer();

    if (mailer?.notifyTo) {
      try {
        await mailer.resend.emails.send({
          from: mailer.from,
          to: mailer.notifyTo,
          replyTo: data.email,
          subject: `Nieuw contactbericht — ${data.naam}`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a;">
              <p style="font-size:16px;font-weight:600;">Nieuw contactbericht via thuismeester.com</p>
              <table style="font-size:14px;border-collapse:collapse;width:100%;">
                <tr><td style="padding:6px 16px 6px 0;color:#666;width:120px;">Naam</td><td><strong>${data.naam}</strong></td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">E-mail</td><td>${data.email}</td></tr>
                ${data.onderwerp ? `<tr><td style="padding:6px 16px 6px 0;color:#666;">Onderwerp</td><td>${data.onderwerp}</td></tr>` : ""}
              </table>
              <p style="font-size:14px;color:#666;margin:16px 0 4px;">Bericht</p>
              <p style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.bericht}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        // Email is our only delivery channel, so a failure means we couldn't
        // accept the message — tell the user to try again.
        console.error("[Thuismeester] Versturen contactbericht mislukt:", mailErr);
        return NextResponse.json(
          { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
          { status: 500 }
        );
      }
    } else {
      // No email configured — log the full message so it isn't lost in dev.
      console.warn("[Thuismeester] E-mail niet ingesteld — contactbericht alleen gelogd:", data);
    }

    console.log("[Thuismeester] Nieuw contactbericht:", data.naam, data.email);
    return NextResponse.json({ message: "Bericht ontvangen." }, { status: 200 });

  } catch (err) {
    // Unexpected error — log details server-side, return generic message to user
    console.error("[Thuismeester] Fout bij contact:", err);
    return NextResponse.json(
      { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

/**
 * GET handler — returns 405 Method Not Allowed.
 * Only POST is supported. This makes the API semantics explicit.
 */
export function GET() {
  return NextResponse.json({ message: "Methode niet toegestaan." }, { status: 405 });
}
