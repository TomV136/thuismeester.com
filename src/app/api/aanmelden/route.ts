/**
 * API Route: POST /api/aanmelden (src/app/api/aanmelden/route.ts)
 *
 * This is a SERVER-SIDE file — it never runs in the browser. Next.js turns
 * any file named route.ts inside the api/ folder into an HTTP endpoint.
 * It's the equivalent of writing a small Node.js/Express handler.
 *
 * What this endpoint does when it receives a POST request:
 *   1. Checks the honeypot field (rejects bots silently)
 *   2. Validates the incoming data (returns 400 if invalid)
 *   3. Saves the sign-up to Supabase (the database)
 *   4. Sends a confirmation email to the sign-up (via Resend)
 *   5. Sends an internal notification email to the owner (via Resend)
 *   6. Returns 200 OK
 *
 * Environment variables required (set in Vercel dashboard or .env.local):
 *   SUPABASE_URL              → your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY → server-only secret key (bypasses RLS; never NEXT_PUBLIC_)
 *   RESEND_API_KEY            → your Resend API key (emails won't send without this)
 *   NOTIFY_EMAIL              → email address to send internal notifications to
 *   MAIL_FROM                 → "From" address shown in emails (optional)
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isValidEmail, normalisePostcode } from "@/lib/validation";
import { getMailer } from "@/lib/email";

/**
 * AanmeldingPayload — TypeScript interface describing the shape of the data
 * we expect from the form. This is like a contract: every field listed here
 * must be present and the correct type before we save it.
 *
 * ? after a property name means it's optional (opmerkingen can be omitted).
 */
interface AanmeldingPayload {
  naam:         string;
  email:        string;
  postcode:     string;
  woonplaats:   string;
  opmerkingen?: string;  // optional — form field is not required
}

/**
 * validatePayload — checks that the incoming request body is valid.
 *
 * Returns a discriminated union (a TypeScript pattern):
 *   { valid: true,  data: AanmeldingPayload }  → proceed with the data
 *   { valid: false, message: string }           → return 400 with this message
 *
 * Why validate server-side even though the form has `required` attributes?
 * Because HTTP requests can be crafted by anyone — not just the browser form.
 * Server-side validation is the only validation you can actually trust.
 */
function validatePayload(body: unknown): { valid: true; data: AanmeldingPayload } | { valid: false; message: string } {
  // Guard: body must be a non-null object
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Ongeldig verzoek." };
  }

  // Cast to a plain record so we can read properties off it
  const b = body as Record<string, unknown>;

  if (!b.naam || typeof b.naam !== "string" || b.naam.trim().length < 2)
    return { valid: false, message: "Vul een geldige naam in." };

  // Email format check shared with the contact route (see src/lib/validation.ts)
  if (!b.email || typeof b.email !== "string" || !isValidEmail(b.email))
    return { valid: false, message: "Vul een geldig e-mailadres in." };

  if (!b.postcode || typeof b.postcode !== "string" || b.postcode.trim().length < 4)
    return { valid: false, message: "Vul een geldige postcode in." };

  if (!b.woonplaats || typeof b.woonplaats !== "string" || b.woonplaats.trim().length < 1)
    return { valid: false, message: "Selecteer een woonplaats." };

  // All checks passed — return clean, normalised data
  return {
    valid: true,
    data: {
      naam:        b.naam.trim(),
      // Emails are stored lowercase to avoid duplicate "Jan@x.nl" vs "jan@x.nl"
      email:       b.email.toLowerCase().trim(),
      // Postcodes are stored uppercase with a single space: "1234ab" → "1234 AB"
      postcode:    normalisePostcode(b.postcode),
      woonplaats:  b.woonplaats.trim(),
      opmerkingen: b.opmerkingen ? String(b.opmerkingen).trim() : undefined,
    },
  };
}

/**
 * getVoornaam — extracts the first name from a full name string.
 * "Jan Jansen" → "Jan". Used to personalise the confirmation email.
 * naam.split(" ")[0] splits on spaces and takes the first word.
 */
function getVoornaam(naam: string): string {
  return naam.split(" ")[0];
}

/**
 * POST handler — Next.js calls this function when it receives a POST request
 * at /api/aanmelden. Exporting a function named "POST" is the convention.
 *
 * NextRequest  — the incoming HTTP request (headers, body, cookies, etc.)
 * NextResponse — the HTTP response we send back (status code + JSON body)
 */
export async function POST(req: NextRequest) {
  try {
    // Read and parse the JSON body that the browser sent
    const body = await req.json();

    /**
     * Honeypot check — the form contains a hidden field called "_hp".
     * Real users never see or fill it in (it's display:none + tabIndex=-1).
     * Spam bots auto-fill all fields, including hidden ones.
     * If _hp has any value → this is a bot → return 200 silently (don't
     * let the bot know it was blocked — some bots retry on errors).
     */
    if (body?._hp) {
      return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });
    }

    // Validate the data — return 400 Bad Request if anything is wrong
    const result = validatePayload(body);
    if (!result.valid) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    const { data } = result;

    /**
     * Save to Supabase
     *
     * Supabase is a hosted PostgreSQL database. getSupabase() (src/lib/supabase.ts)
     * builds a SERVER-ONLY client using the secret service-role key — see that
     * file for why we use the service-role key here instead of the public anon
     * key, and why it must never be exposed to the browser.
     *
     * .from("aanmeldingen") selects the "aanmeldingen" database table.
     * .insert([data]) inserts a new row with the validated data object.
     */
    const supabase = getSupabase();

    const { error: dbError } = await supabase
      .from("aanmeldingen")
      .insert([data]);

    if (dbError) {
      // Database error — log it server-side but show a generic message to the user
      console.error("[Thuismeester] Supabase fout:", dbError.message);
      return NextResponse.json(
        { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    /**
     * Send emails via Resend
     *
     * getMailer() (src/lib/email.ts) returns null when RESEND_API_KEY is not
     * set, which lets the app run in development without email credentials.
     *
     * IMPORTANT: the sign-up is already safely stored in Supabase at this
     * point. So if an email fails to send, we log it but STILL return 200 —
     * we must never show the user an error (which could make them resubmit and
     * create a duplicate) just because a confirmation email didn't go out.
     */
    const mailer   = getMailer();
    const voornaam = getVoornaam(data.naam);

    if (mailer) {
      try {
      /**
       * Email 1: Confirmation to the sign-up
       * This is a plain HTML email — inline styles are required because
       * most email clients (Gmail, Outlook) strip or ignore <style> blocks.
       *
       * Template literals (backtick strings) allow us to embed variables
       * directly: ${voornaam}, ${data.email}, etc.
       */
      await mailer.resend.emails.send({
        from: mailer.from,
        to: data.email,
        subject: "Welkom bij Thuismeester – aanmelding ontvangen",
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
            <div style="background:#2d4a3e;padding:32px 40px;">
              <p style="color:#fff;font-size:20px;font-weight:600;margin:0;">Thuismeester</p>
            </div>
            <div style="padding:40px;background:#fff;">
              <p style="font-size:16px;margin-top:0;">Beste ${voornaam},</p>
              <p style="font-size:15px;line-height:1.7;color:#444;">
                Bedankt voor je aanmelding bij Thuismeester.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#444;">
                Leuk dat je interesse hebt. We hebben je aanmelding goed ontvangen en nemen binnenkort contact met je op om de volgende stap met je door te nemen.
              </p>
              <div style="background:#f5f2ed;padding:24px;margin:24px 0;">
                <p style="font-size:14px;font-weight:600;margin:0 0 12px;">Wat je van ons kunt verwachten:</p>
                <ul style="font-size:14px;line-height:1.8;color:#555;margin:0;padding-left:20px;">
                  <li>we bekijken je aanmelding</li>
                  <li>we nemen contact met je op zodra we starten in jouw buurt of met een passende vervolgstap</li>
                  <li>je zit nergens direct aan vast</li>
                </ul>
              </div>
              <p style="font-size:14px;line-height:1.7;color:#444;">
                Heb je in de tussentijd een vraag? Reageer dan gerust op deze e-mail.
              </p>
              <p style="font-size:14px;color:#444;margin-top:32px;">
                Met vriendelijke groet,<br/><br/>
                <strong>David</strong><br/>
                Thuismeester<br/>
                <a href="https://www.thuismeester.com" style="color:#2d4a3e;">www.thuismeester.com</a>
              </p>
            </div>
            <div style="padding:20px 40px;background:#f5f2ed;text-align:center;">
              <p style="font-size:12px;color:#888;margin:0;">© ${new Date().getFullYear()} Thuismeester · Amersfoort en omstreken</p>
            </div>
          </div>
        `,
      });

      /**
       * Email 2: Internal notification to you (the owner)
       * Only sent if NOTIFY_EMAIL is set. Contains a neat table of the
       * sign-up's details so you can act on it quickly.
       *
       * ${data.opmerkingen ? `<tr>..${data.opmerkingen}..</tr>` : ""}
       * is a ternary inside a template literal — renders the row only if
       * there are comments.
       */
      if (mailer.notifyTo) {
        await mailer.resend.emails.send({
          from: mailer.from,
          to: mailer.notifyTo,
          replyTo: data.email,
          subject: `Nieuwe aanmelding — ${data.naam} (${data.woonplaats})`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a;">
              <p style="font-size:16px;font-weight:600;">Nieuwe aanmelding via thuismeester.com</p>
              <table style="font-size:14px;border-collapse:collapse;width:100%;">
                <tr><td style="padding:6px 16px 6px 0;color:#666;width:120px;">Naam</td><td><strong>${data.naam}</strong></td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">E-mail</td><td>${data.email}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">Postcode</td><td>${data.postcode}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">Woonplaats</td><td>${data.woonplaats}</td></tr>
                ${data.opmerkingen ? `<tr><td style="padding:6px 16px 6px 0;color:#666;">Opmerkingen</td><td>${data.opmerkingen}</td></tr>` : ""}
              </table>
            </div>
          `,
        });
      }
      } catch (mailErr) {
        // Email failed, but the sign-up is already saved — log and continue.
        console.error("[Thuismeester] E-mail versturen mislukt (aanmelding wel opgeslagen):", mailErr);
      }
    } else {
      // No API key configured — log a warning but don't crash
      console.warn("[Thuismeester] RESEND_API_KEY niet ingesteld — e-mails overgeslagen.");
    }

    console.log("[Thuismeester] Aanmelding:", data.naam, data.woonplaats);
    return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });

  } catch (err) {
    // Unexpected error — log full details server-side, return generic message to user
    console.error("[Thuismeester] Fout:", err);
    return NextResponse.json(
      { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

/**
 * GET handler — returns 405 Method Not Allowed.
 * Only POST is supported on this endpoint. Without this, Next.js would return
 * a 404 for GET requests, which is misleading. 405 is the correct HTTP status.
 */
export function GET() {
  return NextResponse.json({ message: "Methode niet toegestaan." }, { status: 405 });
}
