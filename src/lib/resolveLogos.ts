import fs from "node:fs";
import path from "node:path";

/**
 * Server-only helpers for resolving brand-logo file paths in /public/logos.
 *
 * We try multiple extensions in priority order so the design system can mix
 * vector and raster brand assets transparently — drop in whichever the brand
 * provides and the page picks it up. The lookup happens at render time on the
 * server, so the client never sees 404s for missing logos.
 *
 * Do NOT import this module from a `"use client"` boundary — `fs` and `path`
 * aren't available in the client bundle.
 */
const LOGO_EXTENSIONS = [".svg", ".png", ".jpg"] as const;
const LOGOS_DIR = path.join(process.cwd(), "public", "logos");

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Returns the public URL for a tool's logo, or null if no file exists. */
export function resolveLogoSrc(name: string): string | null {
  const slug = slugify(name);
  for (const ext of LOGO_EXTENSIONS) {
    if (fs.existsSync(path.join(LOGOS_DIR, slug + ext))) {
      return `/logos/${slug}${ext}`;
    }
  }
  return null;
}
