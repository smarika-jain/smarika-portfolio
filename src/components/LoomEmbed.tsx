import { AccentSeparators } from "@/components/AccentSeparators";

type LoomEmbedProps = {
  /** Loom embed URL — e.g. `https://www.loom.com/embed/{id}`. */
  url: string;
  /** Accessible title for the iframe (read by screen readers). */
  title: string;
  /**
   * Optional caption below the video. If the caption contains " · "
   * separators, they're auto-colored in the accent rhythm.
   */
  caption?: string;
};

// Vendor-prefixed fullscreen flags for legacy WebKit/Gecko. They aren't part
// of React's typed iframe attributes, so we pass them through a spread bag —
// JSX spreads skip excess-property checks, keeping this type-clean (no
// `@ts-ignore`/`@ts-expect-error` needed). Modern browsers only need the
// unprefixed `allowFullScreen`; these are included for completeness.
const legacyFullscreenAttrs: Record<string, string> = {
  webkitallowfullscreen: "true",
  mozallowfullscreen: "true",
};

/**
 * Responsive 16:9 Loom iframe wrapper. Black background prevents the page
 * from flashing through before the player loads; warm orange glow on hover
 * signals interactivity without competing with the video.
 */
export function LoomEmbed({ url, title, caption }: LoomEmbedProps) {
  // No real video yet — render nothing (no placeholder, no heading).
  if (!url) return null;

  return (
    <figure className="not-prose my-8 max-w-3xl">
      <div className="group/loom relative aspect-video overflow-hidden rounded-lg border border-stone-800 bg-black transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]">
        <iframe
          src={url}
          title={title}
          frameBorder={0}
          allowFullScreen
          allow="accelerometer; autoplay=false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute inset-0 h-full w-full"
          {...legacyFullscreenAttrs}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <AccentSeparators text={caption} />
        </figcaption>
      )}
    </figure>
  );
}
