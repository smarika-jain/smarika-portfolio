"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { SectionNumber } from "@/components/SectionNumber";

const NARRATIVE = [
  "I got into automation because I genuinely hate seeing smart people waste time on things a system could do in seconds. At Aifyy, I watched my colleagues build incredible workflows and I couldn't stay on the sidelines. I jumped in, started building, and never looked back.",
  "Since then, I've built GTM and AI automation systems for 12+ founders and companies, working across the full stack from lead sourcing to outreach to personalization. What excites me most isn't just building the system. It's seeing it run, drive results, and free up someone's entire day.",
  "I run after quality, think in systems, and don't stop until things work exactly the way they should.",
];

const CAPABILITIES = [
  {
    title: "Lead Sourcing & Enrichment",
    description:
      "LinkedIn scraping, website intelligence, AI-powered lead scoring across thousands of records.",
  },
  {
    title: "AI Personalization",
    description:
      "Multi-line icebreakers from real website content, deployed at scale with measurable lift in reply rates.",
  },
  {
    title: "Reply Management & CRM",
    description:
      "Multi-platform sync, automated classification, escalation routing across HeyReach and Instantly.",
  },
] as const;

export type ResolvedTool = {
  name: string;
  /** Public URL for the brand logo file, or null if none was found on disk. */
  logoSrc: string | null;
};

/**
 * Some tool names are too long for the chip layout; the logo carries the
 * brand identity so we can safely render a shorter label. The source name is
 * preserved on the data model (and used for slug resolution server-side).
 */
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  "Google Workspace": "Google",
};

export type ResolvedCategory = {
  label: string;
  tools: ResolvedTool[];
};

/**
 * A logo "chip": a light rounded card containing the brand mark (or its first
 * letter if no logo file exists), paired with the tool name. Designed to
 * contain colored brand logos visually against the dark page background.
 *
 * Hover: card brightens from stone-50 → white, an orange glow appears beneath
 * the chip, tool name shifts from muted to full white.
 */
function ToolChip({ tool }: { tool: ResolvedTool }) {
  const displayName = DISPLAY_NAME_OVERRIDES[tool.name] ?? tool.name;
  return (
    <div className="group/chip flex items-center gap-2.5">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-300/40 bg-stone-50 p-1.5 transition-all duration-200 group-hover/chip:bg-white group-hover/chip:shadow-[0_0_16px_rgba(249,115,22,0.15)]">
        {tool.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- tiny brand icons, no optimization required
          <img
            src={tool.logoSrc}
            alt=""
            width={24}
            height={24}
            className="block h-full w-full object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-mono text-[11px] font-medium text-stone-700"
          >
            {displayName[0].toUpperCase()}
          </span>
        )}
      </span>
      <span className="text-sm text-stone-400 transition-colors duration-200 group-hover/chip:text-white">
        {displayName}
      </span>
    </div>
  );
}

export function AboutContent({ stack }: { stack: ResolvedCategory[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Container coordinates child stagger; children declare their own
  // hidden/visible transitions via the item variant.
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

  return (
    <section id="about" className="border-b border-border-subtle">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl px-6 py-32"
      >
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* ─── LEFT: narrative ───────────────────────────────────────── */}
          <div>
            <motion.div variants={itemVariants}>
              <SectionNumber number="01" label="ABOUT" />
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-6 max-w-xl text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl"
            >
              The story behind the systems.
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-10 max-w-prose space-y-6 text-base leading-relaxed text-muted md:text-lg"
            >
              {NARRATIVE.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: capabilities + stack ──────────────────────────── */}
          <div className="space-y-14">
            {/* What I'm best at */}
            <div>
              <motion.p
                variants={itemVariants}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              >
                What I&apos;m best at
              </motion.p>

              <motion.ul
                variants={itemVariants}
                className="mt-6 space-y-5"
              >
                {CAPABILITIES.map((cap) => (
                  <li key={cap.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-foreground">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {cap.description}
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Stack */}
            <div>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Stack
                </p>
                <span
                  aria-hidden="true"
                  className="block h-px flex-1 bg-border-subtle"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6 space-y-6">
                {stack.map((category) => (
                  <div
                    key={category.label}
                    className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                  >
                    <p className="shrink-0 pt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle sm:w-[110px]">
                      {category.label}
                    </p>
                    <div className="grid w-full max-w-[480px] flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                      {category.tools.map((tool) => (
                        <ToolChip key={tool.name} tool={tool} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
