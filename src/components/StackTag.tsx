type StackTagProps = {
  children: React.ReactNode;
};

/**
 * Small mono pill identifying a tool in a tech-stack list. Used inside the
 * featured project card and on breakdown pages.
 */
export function StackTag({ children }: StackTagProps) {
  return (
    <span className="inline-flex h-7 items-center rounded-md border border-border-subtle bg-surface/40 px-2.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
