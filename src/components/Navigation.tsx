/**
 * Navigation component (src/components/Navigation.tsx)
 *
 * This is a "Client Component" — see the "use client" directive below.
 * It renders the sticky top navigation bar with:
 *   - the Thuismeester wordmark (logo) on the left
 *   - desktop links in the middle
 *   - a CTA button on the right (desktop)
 *   - a hamburger menu for mobile screens
 *
 * The nav is "sticky" — it stays fixed at the top as you scroll.
 */

/**
 * "use client" — Next.js directive
 *
 * By default, React components in Next.js run on the SERVER (they render to
 * HTML once, then send that HTML to the browser — no JS needed client-side).
 * This is great for performance and SEO.
 *
 * BUT: this component needs browser features — specifically event listeners
 * (scroll, click) and React state that changes when the user interacts.
 * "use client" tells Next.js: "this component runs in the browser, with full
 * access to window, document, and interactive React hooks."
 *
 * Rule of thumb: only use "use client" when you need interactivity or
 * browser APIs. Keep as many components as possible server-only.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation links data array.
 *
 * Defined outside the component so it's created once, not on every render.
 * To add a new page to the nav, just add an entry here.
 * href values must match the folder names in src/app/.
 */
const navLinks = [
  { label: "Hoe werkt het",       href: "/hoe-werkt-het" },
  { label: "Diensten",            href: "/diensten" },
  { label: "Over Thuismeester",   href: "/over-thuismeester" },
  { label: "Contact",             href: "/contact" },
];

export default function Navigation() {
  /**
   * useState — React's reactive variable system.
   *
   * In plain JS you'd write: let menuOpen = false;
   * and then: document.querySelector('.menu').classList.add('hidden');
   *
   * In React, you declare state like this:
   *   const [value, setValue] = useState(initialValue);
   *
   * "value" is the current value. "setValue" is a function that updates it.
   * When you call setValue(), React automatically re-renders this component
   * so the UI reflects the new state — no manual DOM updates needed.
   *
   * menuOpen  — is the mobile hamburger menu currently open?
   * scrolled  — has the user scrolled past 16px? (triggers a shadow)
   */
  const [menuOpen, setMenuOpen] = useState(false);   // false = closed by default
  const [scrolled, setScrolled]  = useState(false);  // false = no shadow by default

  /**
   * usePathname — Next.js hook that returns the current URL path.
   * e.g. "/diensten" or "/contact"
   * Used below to highlight the active nav link.
   */
  const pathname = usePathname();

  /**
   * useEffect — runs side effects after the component renders.
   *
   * In plain JS you'd write this inside DOMContentLoaded or a script tag.
   * In React, useEffect is the safe place to do anything that touches the
   * browser (window, document, timers, event listeners, fetch calls, etc.)
   *
   * Structure:
   *   useEffect(() => {
   *     // setup code runs after render
   *     return () => { /* cleanup code runs before unmount *\/ };
   *   }, [dependencies]);  // [] = run once; [val] = run when val changes
   *
   * This first effect adds a scroll listener and removes it on cleanup,
   * preventing memory leaks if the component unmounts.
   * { passive: true } is a performance hint: tells the browser this listener
   * won't call preventDefault(), so it can scroll without waiting for JS.
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] = run once when the component first mounts

  /**
   * This second effect closes the mobile menu whenever the user navigates
   * to a different page. [pathname] means: "re-run this when pathname changes".
   */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    /**
     * <header> — semantic HTML landmark element for site header.
     *
     * sticky top-0 z-50 — makes the header stay at the top of the viewport
     *   as the page scrolls. z-50 ensures it layers above page content.
     *
     * Template literal in className: the backtick string mixes fixed classes
     * with a conditional — ${condition ? 'a' : 'b'} is standard JS ternary.
     * When scrolled is true, "shadow-sm" is added; otherwise it's empty "".
     */
    <header
      className={`sticky top-0 z-50 bg-beige-light transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/*
        <nav> is the semantic HTML element for navigation.
        "section-wrapper" is the custom CSS class from globals.css that
        centres content and adds side padding.
        h-16 on mobile / h-20 on desktop sets the navbar height.
      */}
      <nav className="section-wrapper flex h-16 items-center justify-between md:h-20">

        {/* Logo / wordmark — clicking navigates to homepage */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-green tracking-tight"
        >
          Thuismeester
        </Link>

        {/*
          Desktop navigation links — hidden on mobile (hidden), shown on
          medium+ screens (md:flex). "md:" is a Tailwind breakpoint prefix
          meaning "at screen width ≥ 768px".
        */}
        <ul className="hidden items-center gap-8 md:flex">
          {/**
           * .map() iterates the navLinks array and returns one <li> per item.
           * This is how React renders lists — equivalent to a for-loop that
           * builds up HTML strings, but React handles DOM updates efficiently.
           *
           * key={link.href} is required by React whenever you render a list.
           * It helps React track which item is which when the list changes.
           */}
          {navLinks.map((link) => (
            <li key={link.href}>
              {/**
               * Next.js <Link> is a wrapper around <a> that enables
               * client-side navigation (no full page reload) and prefetches
               * the linked page in the background for instant transitions.
               *
               * Active link styling: pathname === link.href checks if we're
               * currently on this page and applies bolder green styling.
               */}
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-150 hover:text-green ${
                  pathname === link.href
                    ? "font-medium text-green"    // active page: green + bold
                    : "text-ink-soft"             // inactive: muted
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA button — hidden on mobile, shown on md+ */}
        <div className="hidden md:block">
          <Link
            href="/aanmelden"
            className="inline-block bg-green px-5 py-2.5 text-sm font-medium text-white
                       transition-colors duration-150 hover:bg-green-light"
          >
            Aanmelden
          </Link>
        </div>

        {/*
          Mobile hamburger button — visible only on small screens (md:hidden).
          The three <span> elements are the three lines of the hamburger icon.
          CSS transforms animate them into an × when menuOpen is true:
            - top line:    rotates 45° and moves down
            - middle line: fades out (opacity-0)
            - bottom line: rotates -45° and moves up
        */}
        <button
          aria-label="Menu openen"   // accessibility: screen reader label
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}  // toggle: flip current boolean
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/*
        Mobile menu drawer — conditionally rendered.
        In React, {condition && <JSX>} is the "logical AND" pattern for
        conditional rendering. If menuOpen is false, nothing is rendered.
        If true, the drawer appears. This is equivalent to toggling display:none.
      */}
      {menuOpen && (
        <div className="border-t border-beige-dark bg-beige-light md:hidden">
          <ul className="section-wrapper flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-base transition-colors hover:text-green ${
                    pathname === link.href ? "font-medium text-green" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Mobile CTA — full width green button at the bottom of the drawer */}
            <li className="pt-2">
              <Link
                href="/aanmelden"
                className="inline-block w-full bg-green px-5 py-3 text-center text-sm
                           font-medium text-white transition-colors hover:bg-green-light"
              >
                Aanmelden
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
