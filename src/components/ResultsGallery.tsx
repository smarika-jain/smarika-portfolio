import { readImageSize, warnIfLowResolution } from "@/lib/imageMeta";
import { WorkflowImageView } from "@/components/WorkflowImageView";

export type ResultItem = {
  /** Public path, e.g. "/results/4-stakeholder-instantly.png". */
  src: string;
  /** Mono caption below the screenshot. " · " separators get accented. */
  caption?: string;
  /** Alt text; falls back to the caption. */
  alt?: string;
};

// Same responsive hint as workflow diagrams — campaign dashboards also carry
// small text that needs a sharp, high-DPI variant.
const SCREENSHOT_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw";

// Approximate max rendered width, used for the 2x headroom check.
const DISPLAY_WIDTH = 896;

const RESULT_CAPTION =
  "mt-3 text-center font-mono text-sm tracking-wide text-muted";

/**
 * Production result screenshots (Instantly / HeyReach dashboards), rendered as
 * a prominent gallery with a heading, click-to-zoom, and high-quality images
 * (quality 95 — the default 75 mushes the small dashboard text).
 *
 * Renders nothing when there are no results, so empty case studies don't show
 * a dangling heading. Rendering is never gated on file existence: next/image
 * resolves the path at request time and 404s silently if a file is missing.
 */
export function ResultsGallery({ results }: { results?: ResultItem[] }) {
  const items = results ?? [];
  if (items.length === 0) return null;

  return (
    <section className="not-prose my-12">
      <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
        Results in production
      </h2>

      <div className="mt-8 space-y-12">
        {items.map((r) => {
          // Read intrinsic dimensions for a correct aspect ratio when present;
          // fall back to 16:9 nominal otherwise. Not a render gate.
          const dims = readImageSize(r.src);
          warnIfLowResolution(r.src, DISPLAY_WIDTH, "Results gallery");
          return (
            <WorkflowImageView
              key={r.src}
              src={r.src}
              width={dims?.width ?? 1600}
              height={dims?.height ?? 900}
              alt={r.alt ?? r.caption ?? "Campaign result screenshot"}
              caption={r.caption}
              sizes={SCREENSHOT_SIZES}
              maxWidthClass="max-w-4xl"
              captionClassName={RESULT_CAPTION}
              quality={95}
            />
          );
        })}
      </div>
    </section>
  );
}
