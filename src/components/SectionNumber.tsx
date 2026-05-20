type SectionNumberProps = {
  /** Two-digit section number, e.g. "01" */
  number: string;
  /** Section label, e.g. "ABOUT" */
  label: string;
};

/**
 * Section identifier shown above section content, e.g. `01 / ABOUT`.
 * The number is dimmer; the slash + label group brighter as a single
 * visual unit (typographic emphasis on the named section).
 */
export function SectionNumber({ number, label }: SectionNumberProps) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
      <span className="text-muted">{number}</span>
      <span className="text-foreground"> / {label}</span>
    </p>
  );
}
