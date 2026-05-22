import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MetricTile } from "@/components/MetricTile";
import { StackTag } from "@/components/StackTag";
import { AccentSeparators } from "@/components/AccentSeparators";
import { WorkflowImageView } from "@/components/WorkflowImageView";
import type { ProjectMeta } from "@/lib/projects";

/**
 * Large, warm-elevated featured project card. Driven entirely by frontmatter
 * data so every featured project renders consistently. Header order:
 *   FEATURED (accent) → mode (muted) → title → "Built for {client}" → ...
 */
export function FeaturedProjectCard({ project }: { project: ProjectMeta }) {
  const result = project.results?.[0];
  return (
    <article className="group/featured relative overflow-hidden rounded-xl border border-[rgba(249,115,22,0.18)] bg-[#1a140d] p-8 shadow-[inset_0_0_80px_rgba(249,115,22,0.03)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[rgba(249,115,22,0.35)] md:p-10">
      {/* Top-right warm radial — gives the card its "lit corner" feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_60%)]"
      />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Featured
        </p>

        {project.mode && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {project.mode}
          </p>
        )}

        <h3 className="mt-4 max-w-3xl text-balance text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {project.title}
        </h3>

        {project.client && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <AccentSeparators text={`Built for ${project.client}`} />
          </p>
        )}

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {project.description}
        </p>

        {project.supporting && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-500">
            {project.supporting}
          </p>
        )}

        {project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <MetricTile
                key={metric.label}
                value={metric.value}
                label={metric.label}
                verified={metric.verified}
                prominent
              />
            ))}
          </div>
        )}

        {result?.exists ? (
          <WorkflowImageView
            src={result.src}
            width={result.width}
            height={result.height}
            alt={result.alt ?? `${project.title} results`}
            caption={result.caption}
            sizes="(min-width: 768px) 720px, 100vw"
            maxWidthClass="w-full"
            figureClassName="not-prose mt-8"
            captionClassName="mt-3 font-mono text-xs tracking-wide text-stone-500"
            quality={95}
            crop
          />
        ) : (
          <div className="mt-8 flex min-h-[280px] w-full items-center justify-center rounded-lg border border-stone-800">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-600">
              Campaign results pending.
            </p>
          </div>
        )}

        {project.stack.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <StackTag key={tool}>{tool}</StackTag>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href={`/work/${project.slug}`}
            className="group/cta inline-flex h-10 items-center gap-1.5 rounded-md border border-[rgba(249,115,22,0.3)] px-5 text-sm font-medium text-foreground transition-colors hover:border-[rgba(249,115,22,0.6)] hover:bg-[rgba(249,115,22,0.05)]"
          >
            Full breakdown
            <ArrowRight
              className="h-4 w-4 text-accent transition-transform group-hover/cta:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
