import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    // Next.js 16 changed `qualities` to an allowlist defaulting to [75], and
    // coerces any component `quality` prop to the nearest listed value. Without
    // 95 here, our `quality={95}` on technical screenshots silently degrades to
    // 75. This is an allowlist (not a global override), so component-level
    // quality props still win — they just have to be permitted values.
    qualities: [75, 95],
  },
};

// Turbopack requires plugin names to be passed as strings (not function refs).
// `remark-frontmatter` parses YAML frontmatter so it's stripped from rendered
// content; `remark-mdx-frontmatter` exposes it as a named export.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

export default withMDX(nextConfig);
