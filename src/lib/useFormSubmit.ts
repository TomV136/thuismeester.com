/**
 * useFormSubmit hook (src/lib/useFormSubmit.ts)
 *
 * Shared submit logic for the site's forms (AanmeldenForm + ContactForm).
 * Both forms do exactly the same thing — POST their fields as JSON to an API
 * route and track a loading / success / error state — so that logic lives here
 * once instead of being copied into each form.
 *
 * Usage:
 *   const { state, errorMessage, handleSubmit } = useFormSubmit("/api/contact");
 *   <form onSubmit={handleSubmit}> … </form>
 */
"use client";

import { useState, SubmitEvent } from "react";

/**
 * FormState — the lifecycle of a form submission:
 *   idle     → ready for input
 *   loading  → request in flight (disable the button)
 *   success  → swap the form for a thank-you message
 *   error    → show errorMessage, form stays editable
 */
export type FormState = "idle" | "loading" | "success" | "error";

export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();        // no full-page reload — we POST via fetch
    setState("loading");
    setErrorMessage("");

    // Collect every named field in the form into a plain object
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
        return;
      }

      // Server returned a 4xx/5xx. Read its JSON message if there is one —
      // .catch(() => null) guards against an empty or non-JSON error body so
      // we show the real failure instead of a misleading "no connection" error.
      const json = await res.json().catch(() => null);
      setErrorMessage(json?.message || "Er is iets misgegaan. Probeer het opnieuw.");
      setState("error");
    } catch {
      // The request never reached the server (offline, server unreachable, …)
      setErrorMessage("Er kon geen verbinding worden gemaakt. Controleer je internetverbinding.");
      setState("error");
    }
  }

  return { state, errorMessage, handleSubmit };
}
