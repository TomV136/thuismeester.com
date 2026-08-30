/**
 * Site-wide content constants (src/lib/site.ts)
 *
 * Single source of truth for facts that appear in several places (pages,
 * forms, footer and the branded emails). Edit them here and every usage
 * updates at once.
 */

/**
 * The public contact address. Shown to visitors whenever something goes
 * wrong ("mail ons gerust via …") and used as the reply-to on confirmation
 * emails, so replies land in the public inbox instead of at no-reply.
 */
export const CONTACT_EMAIL = "contact@thuismeester.com";

/**
 * The From address on every email the site sends (confirmations and the
 * internal contact notification). Replies are steered elsewhere via Reply-To.
 */
export const NO_REPLY_ADDRESS = "no-reply@thuismeester.com";