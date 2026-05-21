"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";

type MetricTileProps = {
  /** Headline value, e.g. "129", "10,753", "4-tier". */
  value: string;
  /** Caption beneath the value, e.g. "Opportunities generated". */
  label: string;
  /**
   * When `true`, render just the clean value. When `false`, append a small
   * mono `est.` superscript with a native tooltip explaining the provenance.
   */
  verified?: boolean;
  /**
   * Use the larger / heavier treatment intended for the featured project card
   * and breakdown headers. Defaults to the lighter treatment.
   */
  prominent?: boolean;
};

/**
 * A clean numeric value: optional "$" prefix, digits (commas/decimal allowed),
 * optional simple suffix (%, x, K, M, +). Excludes ranges, hyphenated, and
 * word values — those don't count up.
 */
const NUMERIC_RE = /^(\$?)([\d,]+(?:\.\d+)?)([%xKM+]*)$/;

type Parsed =
  | { animate: true; prefix: string; target: number; suffix: string; decimals: number }
  | { animate: false };

function parseMetric(value: string): Parsed {
  const match = value.trim().match(NUMERIC_RE);
  if (!match) return { animate: false };
  const numStr = match[2].replace(/,/g, "");
  const target = Number.parseFloat(numStr);
  if (!Number.isFinite(target)) return { animate: false };
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { animate: true, prefix: match[1], target, suffix: match[3], decimals };
}

function formatCount(
  current: number,
  prefix: string,
  suffix: string,
  decimals: number
): string {
  const fixed =
    decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
  const [intPart, fracPart] = fixed.split(".");
  const withCommas = Number(intPart).toLocaleString("en-US");
  const num = fracPart ? `${withCommas}.${fracPart}` : withCommas;
  return `${prefix}${num}${suffix}`;
}

/**
 * A single metric callout. The displayed text is initialized to the real
 * `value` so it is present in the SSR/static HTML (good for SEO, screen
 * readers, and no-JS). On scroll-into-view the count-up runs purely on the
 * client — it animates from 0 to the real value, then settles on the exact
 * `value`. The static HTML never literally contains "0".
 */
export function MetricTile({
  value,
  label,
  verified = false,
  prominent = false,
}: MetricTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = parseMetric(value);
  const shouldCount = parsed.animate && !reduce;

  // Initialized to the real value → SSR + first client render show the number.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!shouldCount || !inView) return;
    const p = parseMetric(value);
    if (!p.animate) return;
    const controls = animate(0, p.target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) =>
        setDisplay(formatCount(v, p.prefix, p.suffix, p.decimals)),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [shouldCount, inView, value]);

  const estSuffix = !verified && (
    <sup
      className={
        prominent
          ? "font-mono text-[10px] text-subtle"
          : "font-mono text-[9px] text-subtle"
      }
      title="Estimated based on industry benchmarks. Verified results coming soon."
    >
      est.
    </sup>
  );

  if (prominent) {
    // stone-950 is rgb(12,10,9); pulse 40% -> 60% -> 40% alpha during count.
    const pulse =
      shouldCount && inView
        ? {
            backgroundColor: [
              "rgba(12,10,9,0.4)",
              "rgba(12,10,9,0.6)",
              "rgba(12,10,9,0.4)",
            ],
          }
        : undefined;

    return (
      <motion.div
        ref={ref}
        animate={pulse}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="min-h-[140px] rounded-lg border border-stone-800 bg-stone-950/40 p-6"
      >
        <p className="flex items-baseline gap-0.5">
          <span className="whitespace-nowrap text-3xl font-medium tracking-tight text-foreground">
            {display}
          </span>
          {estSuffix}
        </p>
        <p className="mt-3 font-mono text-xs leading-snug text-stone-400">
          {label}
        </p>
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className="rounded-lg border border-border-subtle bg-surface/30 px-5 py-4"
    >
      <p className="flex items-baseline gap-0.5">
        <span className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {display}
        </span>
        {estSuffix}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-muted">{label}</p>
    </div>
  );
}
