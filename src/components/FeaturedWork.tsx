"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionNumber } from "@/components/SectionNumber";
import { MetricTile } from "@/components/MetricTile";
import { StackTag } from "@/components/StackTag";
import { AccentSeparators } from "@/components/AccentSeparators";
import { ProjectCard } from "@/components/ProjectCard";
import type { ProjectMeta } from "@/lib/projects";

const FEATURED = {
  slug: "4-stakeholder-outbound-engine",
  context: "Built for an AI recruitment platform · B2B",
  name: "4-Stakeholder Outbound Engine",
  description:
    "An outbound system that runs while the client sleeps. Scrapes 12K jobs a day, finds up to 4 people per company worth contacting, and never sends the same person two emails.",
  supporting:
    "Running for 54 days straight. 10,753 qualified leads in pipeline. 129 opportunities and counting.",
  metrics: [
    { value: "129", label: "Opportunities generated", verified: true },
    { value: "10,753", label: "Qualified leads, 54 days", verified: true },
    { value: "4-tier", label: "Outreach model", verified: true },
    { value: "15 paths", label: "Routing + escalation", verified: true },
  ],
  stack: [
    "n8n",
    "Apify",
    "OpenAI",
    "AnyMail Finder",
    "Instantly",
    "LinkedIn API",
    "Google Sheets",
    "Apps Script",
  ],
} as const;

export function FeaturedWork({ projects }: { projects: ProjectMeta[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Grid gets its own in-view trigger so cards stagger as you reach the grid.
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  // Nested stagger for the All Projects grid: 60ms between cards.
  const gridContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  return (
    <section id="work" className="border-b border-border-subtle">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl px-6 py-32"
      >
        <motion.div variants={itemVariants}>
          <SectionNumber number="02" label="WORK" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mt-6 max-w-2xl text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl"
        >
          What I&apos;ve actually shipped.
        </motion.h2>

        {/* ─── Elevated featured project card ────────────────────────── */}
        <motion.article
          variants={itemVariants}
          className="group/featured relative mt-12 overflow-hidden rounded-xl border border-[rgba(249,115,22,0.18)] bg-[#1a140d] p-8 shadow-[inset_0_0_80px_rgba(249,115,22,0.03)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-[rgba(249,115,22,0.35)] md:p-10"
        >
          {/* Top-right warm radial — gives the card its "lit corner" feel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_60%)]"
          />

          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Featured
            </p>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              <AccentSeparators text={FEATURED.context} />
            </p>

            <h3 className="mt-5 max-w-3xl text-balance text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {FEATURED.name}
            </h3>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {FEATURED.description}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-subtle">
              {FEATURED.supporting}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURED.metrics.map((metric) => (
                <MetricTile
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  verified={metric.verified}
                  prominent
                />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {FEATURED.stack.map((tool) => (
                <StackTag key={tool}>{tool}</StackTag>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={`/work/${FEATURED.slug}`}
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
        </motion.article>

        {/* ─── All Projects grid ─────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="mt-24">
          <div className="flex items-center gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              All Projects
            </p>
            <span
              aria-hidden="true"
              className="block h-px flex-1 bg-border-subtle"
            />
          </div>
          <motion.div
            ref={gridRef}
            variants={gridContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="mt-8 grid grid-cols-1 items-start gap-4 md:grid-cols-2"
          >
            {projects.map((project) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
