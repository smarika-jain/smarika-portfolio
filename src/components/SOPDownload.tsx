import fs from "node:fs";
import path from "node:path";
import { Download } from "lucide-react";

type SOPDownloadProps = {
  /** Breakdown slug; PDF expected at `/public/docs/{slug}-sop.pdf`. */
  slug: string;
  /** Button label. Defaults to "Download the SOP (redacted)". */
  label?: string;
};

const DOCS_DIR = path.join(process.cwd(), "public", "docs");

/**
 * Download button for a breakdown's operating manual / SOP PDF. Server
 * resolves whether the PDF actually exists on disk at render time:
 *
 *  - File present → solid white CTA, warm orange ring + glow on hover.
 *  - File missing → muted "Coming soon" pill, no link target, not clickable.
 *    Keeps the button visible (so the section's intent is preserved) without
 *    promising a 404 on click.
 */
export function SOPDownload({
  slug,
  label = "Download the SOP (redacted)",
}: SOPDownloadProps) {
  const filename = `${slug}-sop.pdf`;
  const exists = fs.existsSync(path.join(DOCS_DIR, filename));

  if (!exists) {
    return (
      <span className="not-prose my-6 inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface/40 px-5 text-sm font-medium text-muted">
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
        <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          Coming soon
        </span>
      </span>
    );
  }

  return (
    <a
      href={`/docs/${filename}`}
      download
      className="not-prose my-6 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.45),0_0_24px_rgba(249,115,22,0.18)]"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
