"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Decorative ambient SVG: three thin orange flow-lines with traveling pulses,
 * suggesting data moving through an automation pipeline.
 *
 * Lines use right-angle geometry with rounded transitions, not random curves,
 * to read as "workflow diagram" rather than "abstract decoration."
 *
 * Composition (1200×800 viewBox):
 *  - Path A enters left, steps down twice, **terminates** at the convergence
 *    point (720, 460) — left of the right-column photo area.
 *  - Path C enters bottom-left, steps up, **terminates** at the same point.
 *  - Path B is a single horizontal flow across the upper region that exits
 *    cleanly off the right edge, well above the photo.
 *
 * The A+C convergence reads as an intentional "merge" node; the photo area
 * stays uncluttered.
 *
 * Pulses use SVG-native `<animateMotion>` (SMIL). Durations and begin offsets
 * are staggered so no two pulses are ever in the same quadrant simultaneously.
 * Reduced-motion users get the static lines without pulse dots.
 */

// Two paths converge at (720, 460) — left of the photo column
const PATH_A =
  "M -50 220 L 250 220 C 320 220 350 250 350 320 L 350 380 C 350 420 380 460 450 460 L 720 460";
const PATH_C =
  "M -50 680 L 180 680 C 230 680 260 650 260 600 L 260 540 C 260 490 290 460 340 460 L 720 460";

// Single clean horizontal across the upper region, exits right
const PATH_B =
  "M 320 -50 L 320 80 C 320 140 360 170 420 170 L 1250 170";

export function WorkflowLines() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <path id="wf-path-a" d={PATH_A} />
        <path id="wf-path-b" d={PATH_B} />
        <path id="wf-path-c" d={PATH_C} />

        {/* Soft outer glow filter for the traveling pulse dots */}
        <filter id="wf-pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static line strokes */}
      <use
        href="#wf-path-a"
        stroke="rgba(249, 115, 22, 0.22)"
        strokeWidth="1"
        fill="none"
      />
      <use
        href="#wf-path-b"
        stroke="rgba(249, 115, 22, 0.18)"
        strokeWidth="1"
        fill="none"
      />
      <use
        href="#wf-path-c"
        stroke="rgba(249, 115, 22, 0.20)"
        strokeWidth="1"
        fill="none"
      />

      {/* Small terminator dot at the convergence point — sells the "merge" */}
      <circle
        cx="720"
        cy="460"
        r="2"
        fill="rgba(249, 115, 22, 0.45)"
      />

      {/* Traveling pulses — only rendered when motion is allowed */}
      {!reduce && (
        <>
          <circle r="2.5" fill="#f97316" filter="url(#wf-pulse-glow)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              begin="0s"
              rotate="auto"
            >
              <mpath href="#wf-path-a" />
            </animateMotion>
          </circle>

          <circle r="2.5" fill="#f97316" filter="url(#wf-pulse-glow)">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              begin="3s"
              rotate="auto"
            >
              <mpath href="#wf-path-b" />
            </animateMotion>
          </circle>

          <circle r="2.5" fill="#f97316" filter="url(#wf-pulse-glow)">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              begin="5.5s"
              rotate="auto"
            >
              <mpath href="#wf-path-c" />
            </animateMotion>
          </circle>
        </>
      )}
    </svg>
  );
}
