/**
 * Next.js configuration (next.config.ts)
 *
 * This file is read by Next.js at build time and at dev server start.
 * It lets you tweak Next.js's default behaviour — routing, image handling,
 * environment variables, webpack settings, etc.
 *
 * The NextConfig type (imported from "next") gives you TypeScript
 * autocompletion for all available options in your editor.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * images — configuration for Next.js's built-in <Image> component.
   *
   * Next.js's <Image> is a smart replacement for plain <img>:
   *   - automatically resizes images to the exact size needed
   *   - converts to modern formats (WebP/AVIF) for smaller file sizes
   *   - lazy-loads by default (only loads when in the viewport)
   *   - prevents layout shift with reserved space
   *
   * You use it in code like:
   *   import Image from "next/image";
   *   <Image src="/images/foto.jpg" alt="..." fill />
   */
  images: {
    /**
     * unoptimized: true — disables Next.js's image optimisation pipeline.
     *
     * Normally Next.js runs images through a server-side optimiser that
     * resizes and re-encodes them on demand. This requires the Next.js
     * server to be running (which works on Vercel).
     *
     * Set this to false (or remove the line) to re-enable optimisation on
     * Vercel — it makes images load faster for visitors.
     *
     * Set to true for: static exports, some self-hosted setups, or during
     * local development when you want to skip optimisation overhead.
     */
    unoptimized: true,

    /**
     * remotePatterns — a whitelist of external image domains.
     *
     * By default, Next.js blocks <Image src="https://..."> from external
     * URLs for security. You must explicitly allow each hostname here.
     *
     * The homepage uses Unsplash images for placeholder photos (e.g. the
     * "homeowner-busy" and "solution" section images). Those URLs point to
     * images.unsplash.com, which is why it's whitelisted here.
     *
     * When you replace the Unsplash placeholders with your own photos
     * hosted locally (in /public/images/), you can remove this entry.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
