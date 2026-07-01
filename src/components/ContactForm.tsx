"use client";

import Button from "./Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

/**
 * topics — options for the subject dropdown.
 */
export const topics = [
    "Vraag over de dienst",
    "Vraag over aanmelden",
    "Vraag over mijn regio",
    "Samenwerking / partnerschap",
    "Anders",
];

export default function ContactForm() {
    const { state, errorMessage, warningMessage, handleSubmit } = useFormSubmit("/api/contact");

    /**
     * Early return: when submission succeeds, swap the entire form for
     * a confirmation message. React re-renders this component when state
     * changes, so this block takes over automatically.
     */
    if (state === "success") {
        return (
            <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
                        rounded-full bg-green text-white text-xl">
                    ✓
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">
                    Bericht ontvangen
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Dank voor je bericht. We reageren zo snel mogelijk, doorgaans binnen
                    één werkdag.
                </p>
                {/* Non-fatal issue (e.g. confirmation email failed): the
                    message reached us, but the visitor should know why no
                    confirmation email is coming. */}
                {warningMessage && (
                    <p className="mt-4 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm leading-relaxed text-amber-800">
                        {warningMessage}
                    </p>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* ── Honey pot ── */}
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {/* ── Name ── */}
            <div>
                <label htmlFor="contact-name" className="form-label">
                    Naam <span className="text-green">*</span>
                </label>
                <input
                    id="contact-name"
                    name="name"        // key used in FormData + checked in the API route
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Voor- en achternaam"
                    className="form-input"
                />
            </div>

            {/* ── E-mail ── */}
            <div>
                <label htmlFor="contact-email" className="form-label">
                    E-mailadres <span className="text-green">*</span>
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jouw@emailadres.nl"
                    className="form-input"
                />
            </div>

            {/* ── Subject (dropdown) ── */}
            <div>
                <label htmlFor="contact-subject" className="form-label">
                    Onderwerp <span className="text-green">*</span>
                </label>
                <select
                    id="contact-subject"
                    name="subject"
                    required
                    className="form-input bg-white"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecteer een onderwerp
                    </option>
                    {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {/* ── Message ── */}
            <div>
                <label htmlFor="contact-message" className="form-label">
                    Bericht <span className="text-green">*</span>
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Schrijf hier je vraag of opmerking…"
                    className="form-input resize-none"
                />
            </div>

            {state === "error" && errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
            )}

            {/* ── Submit button ── */}
            <div>
                <Button
                    type="submit"
                    disabled={state === "loading"}
                    size="lg"
                    className="w-full justify-center"
                >
                    {state === "loading" ? "Bezig met verzenden…" : "Versturen"}
                </Button>
            </div>
        </form>
    );
}
