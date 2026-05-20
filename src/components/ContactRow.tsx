import { cn } from "@/lib/utils";
import { AccentSeparators } from "@/components/AccentSeparators";

type ContactRowProps = {
  /** Mono label on the left, e.g. "EMAIL". */
  label: string;
  /** Value on the right. " · " separators render in the accent color. */
  value: string;
  /** If present, the row is a link. */
  href?: string;
  /** Open in a new tab (external links). */
  external?: boolean;
};

/**
 * A single contact row: mono label left, value right, 1px bottom border.
 * Clickable rows turn the value warm orange on hover; info-only rows
 * (no href) stay static.
 */
export function ContactRow({ label, value, href, external }: ContactRowProps) {
  const inner = (
    <div className="flex items-center justify-between gap-4 border-b border-stone-800 py-5">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      <span
        className={cn(
          "text-right font-mono text-sm text-foreground sm:text-base",
          href &&
            "transition-all duration-200 ease-out group-hover/row:translate-x-0.5 group-hover/row:text-accent"
        )}
      >
        <AccentSeparators text={value} />
      </span>
    </div>
  );

  if (!href) {
    return inner;
  }

  return (
    <a
      href={href}
      className="group/row block"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {inner}
    </a>
  );
}
