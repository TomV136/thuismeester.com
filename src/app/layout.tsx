/**
 * Root Layout (src/app/layout.tsx)
 *
 * In Next.js's "App Router", every page is wrapped inside one or more layout
 * files. This is the ROOT layout — it wraps every single page on the site.
 *
 * Think of it as the master HTML template you'd normally write in index.html:
 * it sets up <html>, <head>, <body>, and places shared UI (nav, footer) that
 * appears on every page. The actual page content comes in via {children}.
 *
 * Next.js automatically renders this file — you never call it yourself.
 */

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// -------------------------------------------------------
// Google Fonts — loaded via Next.js's font optimisation system.
//
// Instead of a <link> tag in the HTML (which blocks rendering), Next.js
// downloads the fonts at build time, self-hosts them, and injects a CSS
// variable (e.g. --font-inter) that Tailwind's font-sans/font-serif classes
// use. The "display: swap" option means text shows in a fallback font first,
// then swaps to the correct font once loaded — no invisible text flash.
// -------------------------------------------------------

/** Inter — clean sans-serif used for body text and UI */
const inter = Inter({
  subsets: ["latin"],        // only load Latin characters (smaller file)
  variable: "--font-inter",  // exposes this font as a CSS variable
  display: "swap",
});

/** Playfair Display — elegant serif used for headings */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// -------------------------------------------------------
// Site-wide SEO metadata
//
// Next.js reads this exported object and injects the appropriate <meta> tags
// into <head> automatically. Pages can override individual fields by exporting
// their own `metadata` object (see page.tsx files).
//
// "title.template" means page titles become: "Page Name | Thuismeester"
// -------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default:  "Thuismeester — Rust in huis voor Amersfoort en omstreken",
    template: "%s | Thuismeester", // %s is replaced with the page's own title
  },
  description:
    "Thuismeester is jouw vaste aanspreekpunt voor praktische hulp en organisatie rondom je woning. Voor bewoners in Amersfoort, Leusden, Hoevelaken, Nijkerk en Soest. Vanaf €10 per maand.",
  keywords: [
    "thuismeester",
    "Amersfoort",
    "woning hulp",
    "huisbeheer",
    "praktische hulp thuis",
    "woningonderhoud",
    "Leusden",
    "Hoevelaken",
    "Nijkerk",
    "Soest",
  ],
  authors: [{ name: "Thuismeester" }],
  // OpenGraph tags control how the page looks when shared on social media
  openGraph: {
    title:       "Thuismeester — Rust in huis voor Amersfoort en omstreken",
    description: "Jouw vaste aanspreekpunt voor praktische hulp en organisatie rondom je woning.",
    locale:      "nl_NL",
    type:        "website",
  },
};

/**
 * RootLayout component
 *
 * In React, a "component" is a function that returns JSX — the HTML-like
 * syntax you see below. JSX looks like HTML but lives inside JavaScript, and
 * curly braces {} let you drop any JS expression into the markup.
 *
 * Props: { children }
 *   "children" is a special React prop that represents whatever is placed
 *   *inside* this component — in this case, the current page's content.
 *   It's like innerHTML in plain JS.
 *
 *   React.ReactNode is the TypeScript type for "anything renderable" —
 *   text, elements, arrays of elements, null, etc.
 *
 * "Readonly<{...}>" just means the props object can't be mutated inside
 * this function. Standard defensive TypeScript practice.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * <html> and <body> are written directly in JSX here — Next.js expects
     * the root layout to set these up.
     *
     * className on <html> injects the CSS font variables so that
     * font-sans and font-serif classes work everywhere on the page.
     *
     * The body uses Tailwind's "flex" + "min-h-screen" + "flex-col" trick:
     * it makes the page a vertical flex container at least 100vh tall, so
     * the footer is always pushed to the bottom even on short pages.
     */
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Navigation is rendered above every page */}
        <Navigation />

        {/*
          <main> wraps the page content. "flex-1" makes it grow to fill all
          available space between the nav and footer — this is the "sticky
          footer" layout trick.
        */}
        <main className="flex-1">{children}</main>

        {/* Footer is rendered below every page */}
        <Footer />
      </body>
    </html>
  );
}
