/**
 * Tailwind CSS configuration
 *
 * Tailwind works by scanning your source files for class names and generating
 * only the CSS those classes need. This is the opposite of traditional CSS
 * frameworks (like Bootstrap) where you load a big stylesheet upfront.
 *
 * Think of this file as defining your "design tokens" — the brand's colour
 * palette, fonts, and spacing scale — so you can reference them as class names
 * anywhere in the project instead of hardcoding hex values.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  /**
   * content — tells Tailwind which files to scan for class names.
   * It reads every .tsx / .ts / .js file in src/ and tree-shakes any class
   * that it doesn't find there, keeping the final CSS bundle tiny.
   *
   * If you add a new source folder (e.g. src/layouts/) add it here too.
   */
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    /**
     * extend — merges your custom values *into* Tailwind's defaults instead
     * of replacing them. So you keep all the built-in utilities (text-sm,
     * p-4, flex, etc.) and simply add your brand-specific extras on top.
     */
    extend: {
      colors: {
        // -------------------------------------------------------
        // Brand color palette
        // Use these as Tailwind class suffixes, e.g.:
        //   bg-green        → background: #2C4A3E
        //   text-green-300  → color: #8cb9a6
        //   border-beige    → border-color: #F0EBE1
        // -------------------------------------------------------

        // Primary: dark forest green — trust, calm, premium
        green: {
          50:  "#f2f6f4",  // very pale mint — rarely used, good for backgrounds
          100: "#d9e8e1",
          200: "#b3d0c4",
          300: "#8cb9a6",
          400: "#5e9a80",
          500: "#3d7a60",
          600: "#2c5a47",
          700: "#1e3d30",
          800: "#152c22",
          900: "#0d1a14",  // near-black green
          DEFAULT: "#2C4A3E",   // used by "bg-green", "text-green", etc.
          light: "#3D6B5C",     // used by "bg-green-light" on hover states
        },

        // Warm beige tones — welcoming, premium, domestic
        // Usage: bg-beige-light, bg-beige, bg-beige-dark
        beige: {
          50:    "#fdfcf9",
          light: "#FAF8F4",   // page background
          DEFAULT: "#F0EBE1", // section backgrounds
          dark: "#E4DBCc",    // borders and dividers
        },

        // Neutral greys — used for subtle UI elements
        stone: {
          light: "#F5F4F1",
          DEFAULT: "#9B9E97", // placeholder text
          dark: "#5A5E57",
        },

        // Deep text colours — prefer these over plain black
        // ink           → primary text
        // ink-soft      → secondary text
        // ink-muted     → tertiary / helper text
        ink: {
          DEFAULT: "#1A2018",
          soft: "#3D4438",
          muted: "#6B7266",
        },
      },

      /**
       * fontFamily — adds CSS font-family stacks under these names.
       * The CSS variable (--font-inter, --font-playfair) is injected by
       * Next.js's font loader in layout.tsx. The fallbacks below kick in
       * if the Google Font hasn't loaded yet.
       *
       * Usage: font-serif → Playfair Display (headings)
       *        font-sans  → Inter (body text)
       */
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },

      /**
       * fontSize — custom responsive text sizes using CSS clamp().
       * clamp(min, preferred, max) scales smoothly between viewport widths.
       * lineHeight is set alongside to keep headings tight.
       *
       * Usage: text-display-xl, text-display-lg, text-display-md
       */
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)",    { lineHeight: "1.1" }],
        "display-lg": ["clamp(2rem,   4vw, 3rem)",    { lineHeight: "1.15" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
      },

      /**
       * spacing — extra named spacing values on top of Tailwind's default
       * scale (4, 8, 12 … 96 etc.).
       *
       * Usage: py-section → padding-top + padding-bottom: 6rem
       *        py-section-sm → 4rem
       */
      spacing: {
        section:    "6rem",
        "section-sm": "4rem",
      },

      /**
       * maxWidth — named max-width values for layout containers.
       * Usage: max-w-prose  → limits line length to ~68 characters (readable)
       *        max-w-content → constrains the page to 1200px wide
       */
      maxWidth: {
        prose:   "68ch",    // "ch" = width of the "0" character — great for body text
        content: "1200px",
      },
    },
  },

  // No Tailwind plugins are used (e.g. @tailwindcss/forms, @tailwindcss/typography)
  plugins: [],
};
