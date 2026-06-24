/**
 * Shared validation helpers (src/lib/validation.ts)
 *
 * Small, framework-agnostic functions used by the API routes to validate and
 * normalise incoming form data on the server. Keeping them here means both
 * routes apply exactly the same rules instead of each route having its own
 * slightly different copy.
 */

/**
 * isValidEmail — true if the string looks like a real email address.
 * Checks for the minimum structure: text @ text . text, with no spaces.
 *
 * This is intentionally simple. The only way to truly verify an address is to
 * send mail to it, so here we just reject input that is obviously malformed.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * normalisePostcode — formats a Dutch postcode consistently before storing it.
 *   "1234ab"  → "1234 AB"
 *   "1234 ab" → "1234 AB"
 * Anything that isn't a standard "4 digits + 2 letters" postcode is simply
 * returned uppercased with surrounding/duplicate spaces removed.
 */
export function normalisePostcode(postcode: string): string {
  return postcode
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/^(\d{4})([A-Z]{2})$/, "$1 $2");
}
