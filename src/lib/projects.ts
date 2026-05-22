import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { publicFileExists, readImageSize } from "@/lib/imageMeta";

const WORK_DIR = path.join(process.cwd(), "src", "content", "work");

export type ProjectMetric = {
  label: string;
  value: string;
  verified: boolean;
};

export type ProjectResult = {
  src: string;
  caption?: string;
  alt?: string;
  width: number;
  height: number;
  /** True if the referenced file exists in /public at build time. */
  exists: boolean;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  stack: string[];
  metrics: ProjectMetric[];
  order: number;
  featured: boolean;
  /** Engagement mode, e.g. "Fully Autonomous" | "Human In The Loop" | "Fully Managed". */
  mode?: string;
  /** Smaller, muted supporting line shown under the description on cards. */
  supporting?: string;
  /** Result screenshots, resolved with intrinsic dimensions and existence. */
  results?: ProjectResult[];
};

type RawResult = {
  src?: unknown;
  caption?: unknown;
  alt?: unknown;
};

function resolveResults(data: unknown): ProjectResult[] | undefined {
  if (!Array.isArray(data)) return undefined;
  const resolved = data
    .map((item): ProjectResult | null => {
      const raw = item as RawResult;
      const src = typeof raw.src === "string" ? raw.src : "";
      if (!src) return null;
      const dims = readImageSize(src);
      return {
        src,
        caption: typeof raw.caption === "string" ? raw.caption : undefined,
        alt: typeof raw.alt === "string" ? raw.alt : undefined,
        width: dims?.width ?? 1600,
        height: dims?.height ?? 900,
        exists: publicFileExists(src),
      };
    })
    .filter((r): r is ProjectResult => r !== null);
  return resolved.length > 0 ? resolved : undefined;
}

/**
 * Reads frontmatter from every `.mdx` file in src/content/work via gray-matter
 * (no MDX compilation needed for a listing), returning typed project metadata
 * sorted by the `order` field. Server-only — relies on `fs`.
 */
export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(WORK_DIR)) return [];

  const projects = fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        category: String(data.category ?? ""),
        client: String(data.client ?? ""),
        description: String(data.description ?? ""),
        stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
        metrics: Array.isArray(data.metrics)
          ? (data.metrics as ProjectMetric[])
          : [],
        order: typeof data.order === "number" ? data.order : 999,
        featured: data.featured === true,
        mode: typeof data.mode === "string" ? data.mode : undefined,
        supporting:
          typeof data.supporting === "string" ? data.supporting : undefined,
        results: resolveResults(data.results),
      } satisfies ProjectMeta;
    });

  return projects.sort((a, b) => a.order - b.order);
}
