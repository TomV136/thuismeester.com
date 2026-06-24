/**
 * ContactForm component (src/components/ContactForm.tsx)
 *
 * The contact form rendered on the /contact page. Structurally identical to
 * AanmeldenForm — same state machine, same fetch pattern — but collects
 * different fields (message instead of address) and posts to /api/contact.
 *
 * See AanmeldenForm.tsx for detailed comments on useState, handleSubmit,
 * FormData, and the conditional rendering patterns used here.
 */
"use client";

import Button from "./Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

/**
 * topics — options for the subject dropdown.
 * To add or remove a topic, edit this array.
 */
const topics = [
  "Vraag over de dienst",
  "Vraag over aanmelden",
  "Vraag over mijn regio",
  "Samenwerking / partnerschap",
  "Anders",
];

export default function ContactForm() {
  /**
   * Submit logic is shared with AanmeldenForm via the useFormSubmit hook
   * (src/lib/useFormSubmit.ts). We just point it at the contact API route.
   */
  const { state, errorMessage, handleSubmit } = useFormSubmit("/api/contact");

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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* ── Naam ── */}
      <div>
        {/*
          htmlFor must match the input's id — links the label to the input.
          Clicking the label focuses the input (standard HTML/accessibility behaviour).
        */}
        <label htmlFor="contact-naam" className="form-label">
          Naam <span className="text-green">*</span>
        </label>
        <input
          id="contact-naam"
          name="naam"        // key used in FormData + checked in the API route
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

      {/* ── Onderwerp (optional dropdown) ── */}
      <div>
        <label htmlFor="contact-onderwerp" className="form-label">
          Onderwerp
          {/* No asterisk — this field is optional (not required in the API validation) */}
        </label>
        {/*
          defaultValue="" means nothing is selected initially.
          The first option is disabled so it acts purely as a placeholder.
        */}
        <select
          id="contact-onderwerp"
          name="onderwerp"
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

      {/* ── Bericht (required textarea) ── */}
      <div>
        <label htmlFor="contact-bericht" className="form-label">
          Bericht <span className="text-green">*</span>
        </label>
        {/*
          rows={5} sets the initial visible height of the textarea.
          resize-none prevents the user from dragging to resize it.
          The API route requires at least 10 characters in this field.
        */}
        <textarea
          id="contact-bericht"
          name="bericht"
          required
          rows={5}
          placeholder="Schrijf hier je vraag of opmerking…"
          className="form-input resize-none"
        />
      </div>

      {/*
        Error message — only rendered when state is "error" AND a message exists.
        {condition && <element>} is React's shorthand for conditional rendering.
      */}
      {state === "error" && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      {/* ── Submit button ── */}
      <div>
        {/*
          disabled={state === "loading"} greys out the button while the request
          is in flight — prevents double-submissions.
          Button text changes based on state (React re-renders automatically).
        */}
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
