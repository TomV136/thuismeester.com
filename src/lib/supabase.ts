/**
 * Supabase helper (src/lib/supabase.ts)
 *
 * Creates a SERVER-ONLY Supabase client for our API routes.
 *
 * Which key to use — and why it matters:
 *   • SUPABASE_SERVICE_ROLE_KEY is a SECRET that bypasses Row-Level Security
 *     and has full read/write access to your data. It must live on the server
 *     ONLY:
 *       - never prefix it with NEXT_PUBLIC_ (that would ship it to the browser)
 *       - never import this file from a Client Component ("use client")
 *       - never commit the value (keep it in .env.local / Vercel env vars)
 *   • The `anon` key is the public, browser-safe key. We deliberately do NOT
 *     use it here: these inserts run server-side, so we keep Row-Level Security
 *     locked down (no public policies) and let this trusted server code — using
 *     the service-role key — be the only thing that can write.
 *
 * (Using the anon key server-side was the previous behaviour and is a latent
 * bug: with RLS on + no policy the insert is silently rejected; with RLS off
 * the table of personal data becomes readable by anyone holding the anon key.)
 *
 * persistSession / autoRefreshToken are disabled because there is no browser
 * session to persist in a stateless serverless function, and the service role
 * doesn't rely on user auth tokens.
 *
 * Environment variables (server-only, unprefixed):
 *   SUPABASE_URL              → your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY → the secret service-role key
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
