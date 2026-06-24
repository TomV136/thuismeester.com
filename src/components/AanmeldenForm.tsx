/**
 * AanmeldenForm component (src/components/AanmeldenForm.tsx)
 *
 * The sign-up form rendered on the /aanmelden page. This is an interactive
 * component so it needs "use client" (it manages state and handles events).
 *
 * Flow:
 *   1. User fills in the form and clicks "Aanmelden"
 *   2. handleSubmit() is called, sets state to "loading"
 *   3. Data is POSTed to /api/aanmelden (src/app/api/aanmelden/route.ts)
 *   4a. On success → state becomes "success" → success screen is shown
 *   4b. On error   → state becomes "error"   → error message is shown
 *
 * The component also includes a honeypot field (invisible to humans, used to
 * detect bot submissions — see below).
 */
"use client";

import Button from "./Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

/**
 * woonplaatsen — the options for the city dropdown.
 * To add a new city, just add it to this array.
 * "Anders" (Other) is a catch-all for cities not listed.
 */
const woonplaatsen = [
  "Amersfoort",
  "Leusden",
  "Hoevelaken",
  "Nijkerk",
  "Soest",
  "Anders",
];

export default function AanmeldenForm() {
  /**
   * All the submit logic (state machine + fetch) lives in the shared
   * useFormSubmit hook (src/lib/useFormSubmit.ts), which both this form and
   * ContactForm use. We just tell it which API route to POST to.
   *
   *   state        — "idle" | "loading" | "success" | "error"
   *   errorMessage — human-readable error text to show the user
   *   handleSubmit — attach this to the <form>'s onSubmit
   */
  const { state, errorMessage, handleSubmit } = useFormSubmit("/api/aanmelden");

  /**
   * Early return pattern — if submission succeeded, replace the entire form
   * with a thank-you message. React re-renders when state changes, so the
   * moment setState("success") is called, this block renders instead of the form.
   */
  if (state === "success") {
    return (
      <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
        {/* Checkmark circle icon — pure CSS, no icon library needed */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green text-white text-xl">
          ✓
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink">
          Aanmelding ontvangen
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Bedankt voor je aanmelding. We hebben je gegevens ontvangen en nemen binnenkort contact met je op.
        </p>
      </div>
    );
  }

  /**
   * The main form render.
   *
   * onSubmit={handleSubmit} — attaches our handler to the form's submit event.
   *   Equivalent to: form.addEventListener('submit', handleSubmit)
   *
   * noValidate — disables the browser's built-in HTML5 form validation popups.
   * We do our own validation server-side (in the API route), which gives us
   * full control over the error messages.
   *
   * space-y-6 — Tailwind utility that adds 24px vertical spacing between
   * direct children, without needing margin on each element individually.
   */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/*
        ── Honeypot field ──────────────────────────────────────────────────
        A hidden input that human users never see or fill in (hidden via CSS).
        Bots that auto-fill all form fields WILL fill it in.
        The API route checks: if this field has any value → it's a bot → silently
        pretend success (don't save anything, don't send emails).

        tabIndex={-1}       → keyboard Tab navigation skips this field
        autoComplete="off"  → browser autocomplete won't fill it
        aria-hidden="true"  → screen readers ignore it
        className="hidden"  → Tailwind: display: none
        ────────────────────────────────────────────────────────────────── */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* ── Naam ── */}
      <div>
        {/*
          htmlFor="naam" links this label to the input with id="naam".
          Clicking the label focuses the input — same behaviour as HTML.
          form-label is a custom CSS class defined in globals.css.
        */}
        <label htmlFor="naam" className="form-label">
          Naam <span className="text-green" aria-hidden="true">*</span>
        </label>
        <input
          id="naam"
          name="naam"          // must match the key in FormData / the API payload
          type="text"
          required             // HTML5 hint (though we've disabled browser validation)
          autoComplete="name"  // hints the browser to offer saved names
          placeholder="Voor- en achternaam"
          className="form-input"  // custom CSS class from globals.css
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
        ── Postcode + Woonplaats ──
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
          <label htmlFor="woonplaats" className="form-label">
            Woonplaats <span className="text-green" aria-hidden="true">*</span>
          </label>
          {/*
            <select> renders a dropdown. defaultValue="" means no option is
            pre-selected. The first option (value="") is the placeholder — it
            has `disabled` so the user can't re-select it after choosing.
          */}
          <select
            id="woonplaats"
            name="woonplaats"
            required
            className="form-input bg-white"
            defaultValue=""
          >
            <option value="" disabled>Selecteer woonplaats</option>
            {woonplaatsen.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Opmerkingen (optional) ── */}
      <div>
        <label htmlFor="opmerkingen" className="form-label">
          Opmerkingen
          <span className="ml-1 text-xs text-ink-muted">(optioneel)</span>
        </label>
        {/*
          <textarea> is a multi-line text input.
          rows={4} sets the visible height to 4 text lines.
          resize-none prevents the user from dragging to resize it (keeps layout tidy).
        */}
        <textarea
          id="opmerkingen"
          name="opmerkingen"
          rows={4}
          placeholder="Vragen, wensen of aanvullende informatie…"
          className="form-input resize-none"
        />
      </div>

      {/*
        ── Error message ──
        Conditionally rendered: only shown when state is "error" AND there is
        a message. The && pattern is React's shorthand for conditional rendering
        (equivalent to: if (state === "error" && errorMessage) { return <p>... })
      */}
      {state === "error" && errorMessage && (
        <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      {/* ── Submit button ── */}
      <div>
        {/*
          Button component from src/components/Button.tsx.
          type="submit" makes it submit the form when clicked.
          disabled={state === "loading"} greys it out while the request is in flight.
          The text changes dynamically based on state — this is the React pattern
          for loading indicators (no need to manually toggle visibility in the DOM).
        */}
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
