/**
 * Button component (src/components/Button.tsx)
 *
 * A single reusable component that renders EITHER a styled <a> link (when
 * an `href` is provided) OR a native <button> element (when it isn't).
 *
 * This is a common React pattern: one component, two behaviours, decided by
 * the props passed in. The caller doesn't need to know about the distinction.
 *
 * Usage examples:
 *   <Button href="/aanmelden">Schrijf je in</Button>       → renders a link
 *   <Button onClick={handleClick}>Versturen</Button>        → renders a button
 *   <Button href="/diensten" variant="outline" size="lg">   → outline style
 *   <Button type="submit" disabled={loading}>Laden…</Button>
 */

import Link from "next/link";
import { ReactNode } from "react";

/**
 * ButtonProps — TypeScript interface (like a "shape contract" for the props).
 *
 * In plain JS, props are just a regular object — nothing stops you passing
 * the wrong type. In TypeScript, this interface declares exactly which props
 * are allowed and what types they must be. The ? marks a prop as optional.
 *
 * This means: if you write <Button size="huge"> TypeScript will show an error
 * in your editor immediately, before you even run the app.
 */
interface ButtonProps {
  href?:     string;                          // link destination (makes it a <Link>)
  onClick?:  () => void;                      // click handler (makes it a <button>)
  variant?:  "primary" | "outline" | "ghost"; // visual style (default: "primary")
  size?:     "sm" | "md" | "lg";             // size (default: "md")
  children:  ReactNode;                       // the button's text/content (required)
  type?:     "button" | "submit" | "reset";  // HTML button type (default: "button")
  disabled?: boolean;                          // greyed out + unclickable
  className?: string;                          // extra Tailwind classes from caller
}

/**
 * variantClasses — maps each variant name to its Tailwind class string.
 *
 * This is the "lookup table" pattern: rather than if/else chains, you index
 * into an object with the variant name. variantClasses["outline"] returns
 * the outline classes string.
 *
 * primary: solid green background, white text
 * outline: transparent background, green border and text; fills on hover
 * ghost:   no background or border, just an underlined text link
 */
const variantClasses = {
  primary:
    "bg-green text-white hover:bg-green-light focus-visible:ring-green",
  outline:
    "border border-green text-green bg-transparent hover:bg-green hover:text-white focus-visible:ring-green",
  ghost:
    "text-green underline underline-offset-4 hover:text-green-light focus-visible:ring-green",
};

/**
 * sizeClasses — maps each size name to its padding + font-size classes.
 * sm: compact, used in tight spaces
 * md: default, used for most buttons
 * lg: prominent, used for primary CTAs like hero buttons
 */
const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * The Button component function.
 *
 * Destructuring in the parameter list is standard JS: instead of
 *   function Button(props) { const href = props.href; ... }
 * we unpack directly:
 *   function Button({ href, variant = "primary", ... })
 * The = "primary" syntax sets a default value if the prop isn't passed.
 */
export default function Button({
  href,
  onClick,
  variant = "primary",  // default: solid green
  size    = "md",       // default: medium
  children,
  type     = "button",
  disabled = false,
  className = "",
}: ButtonProps) {

  /**
   * Build the full className string by combining:
   *   1. Base styles shared by all variants (flex, transitions, focus ring)
   *   2. The variant-specific classes (colour, border)
   *   3. The size-specific classes (padding, font size)
   *   4. Disabled state classes (faded + not-allowed cursor)
   *   5. Any extra classes passed in by the caller
   *
   * .filter(Boolean) removes any empty strings from the array (e.g. when
   * disabled is false, the disabled string is "").
   * .join(" ") combines the array into a single space-separated string.
   */
  const base = [
    "inline-flex items-center justify-center font-medium tracking-wide",
    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /**
   * Conditional rendering: if an href was passed, render a Next.js <Link>
   * (styled as a button). Otherwise, render a native <button> element.
   *
   * This is why you can use <Button href="/aanmelden"> and <Button type="submit">
   * interchangeably — same visual result, correct HTML semantics.
   */
  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
