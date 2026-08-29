"use client";

import { REGIONS } from "@/lib/site";
import Button from "./Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

export const towns = REGIONS.concat(["Anders"]);

export default function RegisterForm() {
    const { state, errorMessage, warningMessage, handleSubmit } = useFormSubmit("/api/register");

    if (state === "success") {
        return (
            <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green text-white text-xl">
                    ✓
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">
                    Aanmelding ontvangen
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Bedankt voor je aanmelding. We hebben je gegevens ontvangen en nemen binnenkort contact met je op.
                    Was je al aangemeld? Dan ontvang je daarvan per e-mail een bevestiging.
                </p>
                {/* Non-fatal issue (e.g. confirmation email failed): the
                    registration succeeded, but the visitor should know why
                    no email is coming. */}
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
                <label htmlFor="name" className="form-label">
                    Naam <span className="text-green" aria-hidden="true">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required // HTML5 hint (though we've disabled browser validation)
                    autoComplete="name" // hints the browser to offer saved names
                    placeholder="Voor- en achternaam"
                    className="form-input"
                />
            </div>

            {/* ── E-mail ── */}
            <div>
                <label htmlFor="email" className="form-label">
                    E-mailadres <span className="text-green" aria-hidden="true">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jouw@emailadres.nl"
                    className="form-input"
                />
            </div>

            {/*
        ── Postcode + town/city ──
        Two fields side by side using a CSS Grid.
        grid gap-4        → 16px gap between the two columns
        sm:grid-cols-2    → two columns on screens ≥ 640px; stacked on mobile
      */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="postcode" className="form-label">
                        Postcode <span className="text-green" aria-hidden="true">*</span>
                    </label>
                    <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        required
                        autoComplete="postal-code"
                        placeholder="1234 AB"
                        className="form-input"
                        maxLength={7}  // "1234 AB" = 7 characters max
                    />
                </div>

                <div>
                    <label htmlFor="town" className="form-label">
                        Woonplaats <span className="text-green" aria-hidden="true">*</span>
                    </label>
                    <select
                        id="town"
                        name="area"
                        required
                        className="form-input bg-white"
                        defaultValue=""
                    >
                        <option value="" disabled>Selecteer woonplaats</option>
                        {towns.map((w) => (
                            <option key={w} value={w}>{w}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Opmerkingen (optional) ── */}
            <div>
                <label htmlFor="remark" className="form-label">
                    Opmerkingen
                    <span className="ml-1 text-xs text-ink-muted">(optioneel)</span>
                </label>
                <textarea
                    id="remark"
                    name="remark"
                    rows={4}
                    placeholder="Vragen, wensen of aanvullende informatie…"
                    className="form-input resize-none"
                />
            </div>
            {state === "error" && errorMessage && (
                <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </p>
            )}

            {/* ── Submit button ── */}
            <div>
                <Button
                    type="submit"
                    disabled={state === "loading"}
                    size="lg"
                    className="w-full justify-center"
                >
                    {state === "loading" ? "Bezig met verzenden…" : "Aanmelden"}
                </Button>
            </div>

            <p className="text-xs text-ink-muted">
                Velden met <span className="text-green">*</span> zijn verplicht.
            </p>
        </form>
    );
}
