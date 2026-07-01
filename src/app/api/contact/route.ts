import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from '@/lib/supabase'
import { isValidEmail, sanitiseMultiLine, sanitiseSingleLine } from "@/lib/validation";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * The one message shown for every server-side failure: it tells the visitor
 * what happened and that they can (if they want to) reach us directly.
 */
const FAILURE_MESSAGE =
    `Er is bij ons iets misgegaan en je bericht is niet opgeslagen. ` +
    `Probeer het later opnieuw, of mail ons gerust via ${CONTACT_EMAIL}.`;

interface ContactFormDetails {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * validatePayload - checks that the incoming data is valid before continuing.
 */
function validatePayload(body: unknown): { valid: true; data: ContactFormDetails } | { valid: false; message: string } {
    if (!body || typeof body !== "object") {
        return { valid: false, message: "Ongeldig verzoek." };
    }

    const b = body as Record<string, unknown>;

    if (!b.name || typeof b.name !== "string" || b.name.trim().length < 2) {
        return { valid: false, message: "Vul een geldige naam in." };
    }

    if (!b.email || typeof b.email !== "string" || !isValidEmail(b.email)) {
        return { valid: false, message: "Vul een geldig e-mailadres in." };
    }
    // Required so every inquiry is categorised — the dropdown offers "Anders"
    // for anything that doesn't fit the listed topics.
    if (!b.subject || typeof b.subject !== "string" || b.subject.trim().length < 1) {
        return { valid: false, message: "Selecteer een onderwerp." };
    }
    if (!b.message || typeof b.message !== "string" || b.message.trim().length < 10) {
        return { valid: false, message: "Schrijf een bericht van minimaal 10 tekens." };
    }

    // The name and subject are interpolated into the *subject line* of the
    // internal notification email and into log lines. sanitiseSingleLine
    // strips control characters (CR/LF included) so a crafted submission
    // cannot inject extra email headers or forge log entries. The message
    // keeps its newlines (rendered via textToHtml) but loses all other
    // control characters.
    return {
        valid: true,
        data: {
            name: sanitiseSingleLine(b.name),
            email: sanitiseSingleLine(b.email.toLowerCase().trim()),
            subject: sanitiseSingleLine(b.subject),
            message: sanitiseMultiLine(b.message),
        },
    };
}

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch (err) {
        console.log("[Thuismeester] Contact: rejected, invalid JSON body:", err);
        // A body that isn't JSON is a malformed request, not a failure on our
        // side, so this doesn't use FAILURE_MESSAGE ("er is bij ons iets
        // misgegaan").
        return NextResponse.json(
            { message: "Ongeldig verzoek." },
            { status: 400 }
        );
    }

    try {
        if (body && typeof body === "object" && "_hp" in body && body._hp) {
            console.log("[Thuismeester] Contact: bot caught by honeypot, returning fake 200");
            return NextResponse.json({ message: "Bericht ontvangen." }, { status: 200 });
        }

        // Validate — return 400 if anything is missing or wrong
        const result = validatePayload(body);
        if (!result.valid) {
            console.log("[Thuismeester] Contact: rejected, validation failed:", result.message);
            return NextResponse.json({ message: result.message }, { status: 400 });
        }

        const { data: cleanedData } = result;
        console.log(`[Thuismeester] Contact: received valid message from ${cleanedData.name} <${cleanedData.email}>, subject: "${cleanedData.subject}"`);

        const { error } = await getSupabaseClient()
            .from('inquiries')
            .insert({ name: cleanedData.name, email: cleanedData.email, subject: cleanedData.subject, message: cleanedData.message });

        if (error) {
            // Supabase is the system of record: if the message wasn't stored
            // the submission failed, so no emails go out and the visitor is
            // told directly (with our address, in case they want to mail us).
            console.error("[Thuismeester] Contact: database insert failed:", error);
            return NextResponse.json(
                { message: FAILURE_MESSAGE },
                { status: 500 }
            );
        }
        console.log("[Thuismeester] Contact: stored in 'inquiries'");
        // TODO: Send an email to contact@thuismeester.com and to the recipient telling them that they asked a question

        console.log(`[Thuismeester] Contact: completed for ${cleanedData.name} <${cleanedData.email}>`);
        return NextResponse.json({ message: "Bericht ontvangen." }, { status: 200 });
    } catch (err) {
        console.error("[Thuismeester] Contact: unexpected error:", err);
        return NextResponse.json(
            { message: FAILURE_MESSAGE },
            { status: 500 }
        );
    }
}

/*
 * GET handler — returns 405 Method Not Allowed.
 * Only POST is supported on this endpoint. Without this, Next.js would return
 * a 404 for GET requests, which is misleading. 405 is the correct HTTP status.
 */
export function GET() {
    return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
