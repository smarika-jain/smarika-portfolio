"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Small "available for work" indicator: a warm accent dot that gently pulses
 * (opacity 1 → 0.5 → 1 over 2s) with a single expanding ring that fades out on
 * each cycle. Subtle, not attention-grabbing. Static for reduced-motion users.
 */
export function StatusDot() {
  const reduce = useReducedMotion();

  return (
    <>
      <span className="relative flex h-1.5 w-1.5 items-center justify-center">
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
        <motion.span
          aria-hidden="true"
          className="relative block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(249,115,22,0.55)]"
          animate={reduce ? undefined : { opacity: [1, 0.5, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </span>
      <span className="sr-only">Available for work.</span>
    </>
  );
}
