/**
 * Footer component (src/components/Footer.tsx)
 *
 * Renders the dark-green footer that appears at the bottom of every page
 * (injected by RootLayout in layout.tsx).
 *
 * Layout: three columns on desktop (md:grid-cols-3), stacked on mobile.
 *   1. Brand column — wordmark, tagline, region note
 *   2. Navigation column — links to all pages
 *   3. Contact column — pre-launch info note
 *
 * This component has no interactivity (no clicks, no state), so it does NOT
 * need "use client" — it runs on the server and ships as plain HTML.
 */

import Link from "next/link";

/**
 * REGION_NOTE — single source of truth for the region string.
 * Defined as a constant so you only need to update it in one place
 * if the served region ever changes (used in two spots below).
 */
const REGION_NOTE = "Amersfoort en omstreken";

/**
 * footerLinks — array of page links rendered in the navigation column.
 * To add or remove a footer link, edit this array.
 */
const footerLinks = [
  { label: "Hoe werkt het",     href: "/hoe-werkt-het" },
  { label: "Diensten",          href: "/diensten" },
  { label: "Over Thuismeester", href: "/over-thuismeester" },
  { label: "Aanmelden",         href: "/aanmelden" },
  { label: "Contact",           href: "/contact" },
];

export default function Footer() {
  /**
   * new Date().getFullYear() returns the current 4-digit year (e.g. 2026).
   * Called at render time — since this component is server-rendered, it
   * runs once per request and produces the correct year automatically
   * without any client-side JavaScript.
   */
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green text-white">
      {/* section-wrapper: centres content + side padding (defined in globals.css) */}
      <div className="section-wrapper py-16">

        {/*
          Three-column grid:
          grid           → CSS Grid layout
          gap-12         → 48px gap between columns
          md:grid-cols-3 → three equal columns on screens ≥ 768px;
                           single column (default) on mobile
        */}
        <div className="grid gap-12 md:grid-cols-3">

          {/* ── Column 1: Brand ── */}
          <div>
            <p className="font-serif text-xl font-semibold tracking-tight">
              Thuismeester
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Jouw vaste aanspreekpunt voor praktische hulp en organisatie
              rondom je woning.
            </p>
            {/* text-white/50 = white at 50% opacity (Tailwind transparency syntax) */}
            <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
              {REGION_NOTE}
            </p>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Navigatie
            </p>
            <ul className="space-y-2.5">
              {/*
                .map() renders one <li> per footerLinks entry.
                key={link.href} is required by React for list items — it helps
                React track which item is which if the list ever changes.
              */}
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact / pre-launch note ── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Contact
            </p>
            {/* Bordered box with a soft pre-launch notice */}
            <div className="rounded-sm border border-white/20 p-4">
              <p className="text-xs leading-relaxed text-white/60">
                Thuismeester start in januari 2027 bij voldoende aanmeldingen
                in {REGION_NOTE}.
              </p>
            </div>
          </div>
        </div>

        {/*
          Bottom bar: copyright line + region note, separated by a faint border.
          On mobile: stacked (flex-col). On sm+ screens: side by side (sm:flex-row).
        */}
        <div className="mt-12 border-t border-white/15 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} Thuismeester. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-white/40">
            {REGION_NOTE}
          </p>
        </div>
      </div>
    </footer>
  );
}
