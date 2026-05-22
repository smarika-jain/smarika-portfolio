"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { SectionNumber } from "@/components/SectionNumber";
import { ProjectCard } from "@/components/ProjectCard";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import type { ProjectMeta } from "@/lib/projects";

export function FeaturedWork({ projects }: { projects: ProjectMeta[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // The "Other projects" grid gets its own in-view trigger so cards stagger
  // as you reach the grid.
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  // `projects` arrives sorted by `order`. Split into the two tiers.
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

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

  // Nested stagger for the Other projects grid: 60ms between cards.
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
          Systems that run my clients&apos; outbound while they sleep.
        </motion.h2>

        {/* ─── Featured project cards (full width, stacked) ──────────── */}
        <motion.div variants={itemVariants} className="mt-12 space-y-12">
          {featured.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        {/* ─── Other projects grid ───────────────────────────────────── */}
        {others.length > 0 && (
          <motion.div variants={itemVariants} className="mt-24">
            <div className="flex items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Other projects
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
              {others.map((project) => (
                <motion.div key={project.slug} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
