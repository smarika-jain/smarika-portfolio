import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MetricTile } from "@/components/MetricTile";
import { StackTag } from "@/components/StackTag";
import { WorkflowImage } from "@/components/WorkflowImage";
import { AccentSeparators } from "@/components/AccentSeparators";

type BreakdownMetric = {
  label: string;
  value: string;
  verified: boolean;
};

type WorkflowAsset = {
  src: string;
  caption?: string;
};

type BreakdownFrontmatter = {
  title: string;
  category: string;
  client: string;
  description: string;
  stack: string[];
  metrics: BreakdownMetric[];
  loom?: string;
  workflows?: {
    hero?: WorkflowAsset;
    inline?: Array<WorkflowAsset & { placement?: string }>;
  };
  results?: Array<{ src: string; caption?: string; alt?: string }>;
  order?: number;
  featured?: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "work");

/**
 * Tell Next.js the valid slugs at build time so it can prerender each case
 * study and 404 cleanly for anything else.
 */
export async function generateStaticParams() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export const dynamicParams = false;

export default async function BreakdownPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let mdxModule: {
    default: React.ComponentType<{
      workflows?: BreakdownFrontmatter["workflows"];
      results?: BreakdownFrontmatter["results"];
    }>;
    frontmatter: BreakdownFrontmatter;
  };
  try {
    mdxModule = await import(`@/content/work/${slug}.mdx`);
  } catch {
    notFound();
  }

  const Post = mdxModule.default;
  const fm = mdxModule.frontmatter;

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-5xl px-6 pb-24 pt-32">
          {/* Header — constrained to a comfortable reading width */}
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              href="/#work"
              className="group/back inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft
                className="h-3 w-3 transition-transform group-hover/back:-translate-x-0.5"
                aria-hidden="true"
              />
              All work
            </Link>

            <header className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {fm.category}
              </p>

              <h1 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {fm.title}
              </h1>

              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <AccentSeparators text={`Built for ${fm.client}`} />
              </p>

              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                {fm.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {fm.stack.map((tool) => (
                  <StackTag key={tool}>{tool}</StackTag>
                ))}
              </div>
            </header>
          </div>

          {/* Hero workflow diagram — the visual hero, full content width */}
          {fm.workflows?.hero && (
            <div className="mt-12">
              <WorkflowImage
                src={fm.workflows.hero.src}
                alt={`${fm.title}, architecture diagram`}
                caption={fm.workflows.hero.caption}
                size="hero"
              />
            </div>
          )}

          {/* Metric tiles — full content width. Column count adapts to the
              number of metrics so a 3-metric study doesn't leave a gap. */}
          <div
            className={`mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
              fm.metrics.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {fm.metrics.map((m) => (
              <MetricTile
                key={m.label}
                value={m.value}
                label={m.label}
                verified={m.verified}
                prominent
              />
            ))}
          </div>

          {/* MDX body — wider column; running text + Loom stay constrained
              to max-w-3xl, inline workflow diagrams break out to max-w-4xl.
              `workflows` is threaded via props so body expressions can place
              inline diagrams from the same frontmatter source. */}
          <div className="mt-16 max-w-4xl">
            <Post workflows={fm.workflows} results={fm.results} />
          </div>

          {/* Bottom navigation */}
          <nav
            aria-label="Breakdown"
            className="mt-20 max-w-3xl border-t border-stone-800 pt-8"
          >
            <Link
              href="/#work"
              className="group/nav inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft
                className="h-3 w-3 transition-transform group-hover/nav:-translate-x-1"
                aria-hidden="true"
              />
              All work
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const mod = await import(`@/content/work/${slug}.mdx`);
    const fm = mod.frontmatter as BreakdownFrontmatter;
    return {
      title: fm.title,
      description: fm.description,
    };
  } catch {
    return {};
  }
}
