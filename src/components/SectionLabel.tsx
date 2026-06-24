/**
 * SectionLabel component (src/components/SectionLabel.tsx)
 *
 * A small decorative uppercase label placed above section headings to provide
 * context or category — e.g. "Diensten", "Werkwijze", "Tarief".
 *
 * Usage:
 *   <SectionLabel>Diensten</SectionLabel>
 *   <h2>Wat doet de Thuismeester?</h2>
 *
 * This is a "presentational" component — it has no logic, only styling.
 * The content (text) is passed in as `children`, which is React's term for
 * whatever you put between the opening and closing tags.
 *
 * { children: React.ReactNode } is a TypeScript shorthand for an object with
 * one property. React.ReactNode means "anything renderable" — usually a string
 * like "Diensten", but could also be a <span> element with special styling.
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    /**
     * inline-block     → sits in the text flow but respects width/padding
     * font-sans        → Inter (body font, not the serif heading font)
     * text-xs          → 12px
     * font-semibold    → slightly bold
     * uppercase        → ALL CAPS
     * tracking-widest  → maximum letter spacing — common for all-caps labels
     * text-green       → brand dark green
     * mb-4             → 16px space below, before the heading
     */
    <p className="mb-4 inline-block font-sans text-xs font-semibold uppercase tracking-widest text-green">
      {children}
    </p>
  );
}
