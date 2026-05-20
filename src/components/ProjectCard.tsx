import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StackTag } from "@/components/StackTag";
import type { ProjectMeta } from "@/lib/projects";

const MAX_TAGS = 5;

/**
 * Compact project card for the All Projects grid. Links to the breakdown.
 * Hover shifts the border to a warm orange tint with a subtle background lift
 * (no scale — border/bg shift only).
 */
export function ProjectCard({ project }: { project: ProjectMeta }) {
  const metric = project.metrics[0];
  const visibleStack = project.stack.slice(0, MAX_TAGS);
  const extraTags = project.stack.length - visibleStack.length;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group/card flex flex-col rounded-xl border border-border-subtle bg-surface/20 p-6 transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:border-[rgba(249,115,22,0.25)] hover:bg-surface/40"
    >
      {project.featured && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Featured
        </p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
        {project.category}
      </p>

      <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-foreground">
        {project.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {metric && (
        <p className="mt-4 flex items-baseline gap-1.5">
          <span className="text-xl font-medium tracking-tight text-foreground">
            {metric.value}
          </span>
          <span className="text-xs text-muted">{metric.label}</span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleStack.map((tool) => (
          <StackTag key={tool}>{tool}</StackTag>
        ))}
        {extraTags > 0 && <StackTag>+{extraTags}</StackTag>}
      </div>

      <span className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover/card:text-accent">
        Full breakdown
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
