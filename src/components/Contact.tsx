"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Download } from "lucide-react";
import { SectionNumber } from "@/components/SectionNumber";
import { ContactRow } from "@/components/ContactRow";
import { site } from "@/lib/site";

export function Contact({ resumeAvailable }: { resumeAvailable: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
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
    <section id="contact" className="border-b border-border-subtle">
      <motion.div
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto max-w-5xl px-6 py-32"
      >
        <motion.div variants={itemVariants}>
          <SectionNumber number="04" label="GET IN TOUCH" />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-5xl"
        >
          Let&apos;s work together.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          Open to full-time GTM engineering roles. I reply within 24 hours.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 max-w-2xl">
          <ContactRow
            label="Email"
            value={site.email}
            href={`mailto:${site.email}`}
          />
          <ContactRow
            label="LinkedIn"
            value="linkedin.com/in/smarikajain"
            href={site.linkedin}
            external
          />
          <ContactRow
            label="Location"
            value="Saharanpur, India."
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          {resumeAvailable ? (
            <a
              href="/resume.pdf"
              download
              className="group/cta inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-stone-200"
            >
              <Download className="h-4 w-4 text-accent" aria-hidden="true" />
              Download resume
            </a>
          ) : (
            <span className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface/40 px-6 text-sm font-medium text-muted">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
              <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                Coming soon
              </span>
            </span>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
