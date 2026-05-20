"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { WorkflowLines } from "@/components/WorkflowLines";

const STACK = [
  "n8n",
  "Claude",
  "OpenAI",
  "Apify",
  "Clay",
  "Apollo",
  "Instantly",
  "HeyReach",
  "Airtable",
  "Notion",
];

/**
 * Subtle entrance: 8px translate-up + fade, easeOut, 400ms.
 * Returns motion props for a given stagger step (in seconds).
 */
function useEntrance() {
  const reduce = useReducedMotion();
  return (delay: number) =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.4,
            ease: "easeOut",
            delay,
          } satisfies Transition,
        };
}

/** Accent-colored bullet separator for mono lists. aria-hidden so screen readers skip it. */
function AccentBullet() {
  return (
    <span className="mx-1.5 text-accent" aria-hidden="true">
      ·
    </span>
  );
}

export function Hero() {
  const entrance = useEntrance();
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border-subtle"
    >
      {/* Layer A: warm radial glow behind the headline. Larger and more present than the previous white version. */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={reduce ? undefined : { duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-[18%] top-[28%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0.10)_25%,transparent_65%)]"
      />

      {/* Layer B: animated workflow lines, behind content */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={reduce ? undefined : { duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <WorkflowLines />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6 pb-32 pt-40 md:pb-44 md:pt-48">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
          <div>
            <motion.p
              {...entrance(0)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
            >
              GTM Engineer
              <AccentBullet />
              India
            </motion.p>

            <motion.h1
              {...entrance(0.1)}
              className="mt-8 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-stone-100 sm:text-5xl md:text-6xl"
            >
              I build AI automation systems that{" "}
              <span className="text-white underline decoration-2 decoration-[#f97316]/70 underline-offset-[6px]">
                drive revenue.
              </span>
            </motion.h1>

            <motion.p
              {...entrance(0.2)}
              className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Lead sourcing, outreach personalization, and CRM automation for
              B2B teams. Built 12+ systems for founders across the GTM stack.
            </motion.p>

            <motion.p
              {...entrance(0.3)}
              className="mt-10 font-mono text-xs text-subtle"
            >
              {STACK.map((tool, i) => (
                <span key={tool}>
                  {tool}
                  {i < STACK.length - 1 && <AccentBullet />}
                </span>
              ))}
            </motion.p>

            <motion.div
              {...entrance(0.4)}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-stone-200"
              >
                View work
                <ArrowRight
                  className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex h-10 items-center rounded-md border border-[rgba(249,115,22,0.3)] px-5 text-sm font-medium text-foreground transition-colors hover:border-[rgba(249,115,22,0.6)] hover:bg-[rgba(249,115,22,0.05)]"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={
              reduce ? undefined : { duration: 0.6, ease: "easeOut" }
            }
            className="mx-auto w-full max-w-[220px] md:mx-0 md:max-w-[400px]"
          >
            <div className="aspect-square overflow-hidden rounded-full border border-border-subtle bg-surface">
              <Image
                src="/headshot.jpg"
                alt="Smarika Jain"
                width={1000}
                height={1000}
                priority
                sizes="(min-width: 768px) 400px, 220px"
                className="block h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — fades in after content stagger, then bounces */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={
          reduce ? undefined : { duration: 0.4, ease: "easeOut", delay: 0.6 }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          aria-label="Scroll to content"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="block text-muted transition-colors hover:text-foreground"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
