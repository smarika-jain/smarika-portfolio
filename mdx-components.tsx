import type { MDXComponents } from "mdx/types";
import { LoomEmbed } from "@/components/LoomEmbed";
import { WorkflowImage } from "@/components/WorkflowImage";
import { ResultsGallery } from "@/components/ResultsGallery";
import { SOPDownload } from "@/components/SOPDownload";

/**
 * Global MDX component overrides:
 *  - Native HTML elements (h2/h3/p/ul/ol/li/strong/a/code/em) get warm-minimal
 *    typography styling so case study prose blends with the rest of the page.
 *  - Custom components (LoomEmbed, WorkflowImage, SOPDownload) are made
 *    available without per-file imports.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-16 max-w-3xl scroll-mt-24 text-2xl font-medium leading-tight tracking-tight text-foreground first:mt-0 md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 max-w-3xl text-lg font-medium tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-5 max-w-3xl list-disc space-y-2.5 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-5 max-w-3xl list-decimal space-y-3 pl-6 marker:font-mono marker:text-subtle" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="text-base leading-relaxed text-muted md:text-lg"
      {...props}
    >
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="text-foreground" {...props}>
      {children}
    </em>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-foreground underline decoration-[#f97316]/40 underline-offset-2 transition-colors hover:decoration-[#f97316]"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  LoomEmbed,
  WorkflowImage,
  ResultsGallery,
  SOPDownload,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
