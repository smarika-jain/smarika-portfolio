import { cn } from "@/lib/utils";
import {
  publicFileExists,
  readImageSize,
  warnIfLowResolution,
} from "@/lib/imageMeta";
import { WorkflowImageView } from "@/components/WorkflowImageView";

type WorkflowImageProps = {
  /** Public path to the image, e.g. "/workflows/4-stakeholder-architecture.png". */
  src: string;
  /** Alt text for the rendered image. */
  alt: string;
  /** Optional mono caption below the diagram. " · " separators get accented. */
  caption?: string;
  /**
   * Width tier:
   *  - "hero": max-w-5xl, taller placeholder, eager-loaded — the page-level
   *    architecture diagram.
   *  - "inline": max-w-4xl, lazy-loaded — diagrams embedded within prose.
   */
  size?: "hero" | "inline";
};

// Responsive sizing hint shared by all technical screenshots. Intentionally
// generous on large viewports so high-DPI displays receive a crisp variant.
const SCREENSHOT_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw";

// Approximate max rendered width per tier, used for the 2x headroom check.
const DISPLAY_WIDTH = { hero: 1024, inline: 896 } as const;

/**
 * Workflow diagram slot. Resolves the image server-side (reading real PNG
 * dimensions so next/image reserves correct space and serves a sharp variant)
 * and delegates to a client view with click-to-zoom lightbox. Missing files
 * render a placeholder at the matching width tier so the layout holds.
 *
 * High quality (95) is essential here: at the default quality (75), the fine
 * 1px lines and small labels in n8n workflow screenshots get crushed.
 */
export function WorkflowImage({
  src,
  alt,
  caption,
  size = "inline",
}: WorkflowImageProps) {
  const maxWidthClass = size === "hero" ? "max-w-5xl" : "max-w-4xl";
  const displayWidth = DISPLAY_WIDTH[size];

  if (!src || !publicFileExists(src)) {
    return (
      <div
        role="img"
        aria-label="Workflow diagram: pending upload"
        className={cn(
          "flex w-full items-center justify-center rounded-lg border border-stone-800 bg-surface/30",
          size === "hero" ? "min-h-[400px]" : "min-h-[300px]",
          maxWidthClass
        )}
      >
        <p className="font-mono text-xs text-muted">
          Workflow diagram: pending upload.
        </p>
      </div>
    );
  }

  // Build-time sharpness guard.
  warnIfLowResolution(src, displayWidth, `Workflow diagram (${size})`);

  const dims = readImageSize(src);

  return (
    <WorkflowImageView
      src={src}
      width={dims?.width ?? 1600}
      height={dims?.height ?? 900}
      alt={alt}
      caption={caption}
      sizes={SCREENSHOT_SIZES}
      maxWidthClass={maxWidthClass}
      quality={95}
      priority={size === "hero"}
    />
  );
}
