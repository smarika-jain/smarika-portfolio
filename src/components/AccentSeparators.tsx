/**
 * Renders a string that uses " · " as separators, recoloring each separator
 * in the accent color. Used throughout the page to maintain a consistent
 * "mono label with accent bullets" rhythm — same pattern as the hero label
 * and stack line.
 */
export function AccentSeparators({ text }: { text: string }) {
  const parts = text.split(" · ");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="mx-1.5 text-accent" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </>
  );
}
