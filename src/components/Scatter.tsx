"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScatterProps = {
  posCls: string; // absolute position + size
  parallax: number; // scroll drift px (negative = rises while scrolling)
  orbit: number; // idle orbit amplitude (px)
  orbitDur: number; // idle orbit duration (s)
  rotate: number;
  children: ReactNode;
  progress: MotionValue<number>;
  wrapperCls?: string; // extra classes (e.g. GSAP entrance targets)
};

/**
 * One floating dish asset drifting at the page edge.
 *
 * Performance (gsap-performance):
 *  - The infinite orbit only runs while the element is near the viewport
 *    (useInView with a 200px margin) — off-screen scatters cost nothing.
 *  - All motion is transform/opacity only, with `will-change: transform`
 *    promoted on the layers that actually animate.
 */
export default function Scatter({
  posCls,
  parallax,
  orbit,
  orbitDur,
  rotate,
  children,
  progress,
  wrapperCls = "",
}: ScatterProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const y = useTransform(progress, [0, 1], [0, parallax]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute z-0 ${posCls} ${wrapperCls}`}
    >
      <motion.div
        style={reduceMotion ? undefined : { y }}
        className="will-change-transform"
      >
        <motion.div
          animate={
            reduceMotion
              ? { x: 0, y: 0 }
              : inView
                ? { x: [0, orbit, 0, -orbit, 0], y: [0, -orbit * 0.7, 0, orbit * 0.7, 0] }
                : { x: 0, y: 0 }
          }
          transition={
            inView && !reduceMotion
              ? { repeat: Infinity, duration: orbitDur, ease: "easeInOut" }
              : { duration: 0.4, ease: "easeOut" }
          }
          style={{ rotate }}
          className="will-change-transform"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
