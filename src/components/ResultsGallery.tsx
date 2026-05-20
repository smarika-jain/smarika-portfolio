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

/**
 * Renders campaign result screenshots (Instantly / HeyReach dashboards) at high
 * quality with click-to-zoom. These are technical screenshots with small text,
 * so they render at quality 95 (default 75 compresses the text into mush).
 *
 * We do NOT gate rendering on file existence: any result declared in
 * frontmatter is rendered, and next/image resolves the path at request time. If
 * a file is genuinely missing it 404s silently — acceptable, and avoids the
 * false-negative placeholder bug a build-time existence check caused.
 *
 * The empty state shows only when no results are declared at all.
 */
export function ResultsGallery({ results }: { results?: ResultItem[] }) {
  const items = results ?? [];

  if (items.length === 0) {
    return (
      <div className="not-prose my-8 flex min-h-[200px] max-w-4xl items-center justify-center rounded-lg border border-dashed border-border bg-surface/30">
        <p className="font-mono text-xs text-muted">
          Real campaign results coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="not-prose my-8 max-w-4xl space-y-8">
      {items.map((r) => {
        // Read intrinsic dimensions for a correct aspect ratio when the file is
        // present; fall back to 16:9 nominal if it can't be read (missing/
        // non-PNG). This is not a render gate — the image renders either way.
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
            quality={95}
          />
        );
      })}
    </div>
  );
}
