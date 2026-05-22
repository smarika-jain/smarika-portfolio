import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "src", "content", "work");

export type ProjectMetric = {
  label: string;
  value: string;
  verified: boolean;
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
};

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
      } satisfies ProjectMeta;
    });

  return projects.sort((a, b) => a.order - b.order);
}
