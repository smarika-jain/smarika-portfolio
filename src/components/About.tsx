import { toolStack } from "@/lib/stack";
import { resolveLogoSrc } from "@/lib/resolveLogos";
import {
  AboutContent,
  type ResolvedCategory,
} from "@/components/AboutContent";

/**
 * Server wrapper for the About section. Resolves which logo file (if any)
 * exists in /public/logos for each tool, then hands the result to the client
 * component that owns rendering + motion. By resolving server-side, the client
 * never issues 404 requests for missing brand assets.
 */
export function About() {
  const resolvedStack: ResolvedCategory[] = toolStack.map((category) => ({
    label: category.label,
    tools: category.tools.map((name) => ({
      name,
      logoSrc: resolveLogoSrc(name),
    })),
  }));

  return <AboutContent stack={resolvedStack} />;
}
