"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type FloatSpec = {
  src: string;
  alt: string;
  className: string; // placement + size + rotation
  progress: MotionValue<number>;
  moveY: number; // scroll parallax drift (px over the full page)
  rotateTo: number; // parallax rotation
  bob: number; // idle float amplitude (px)
  bobDur: number; // idle float duration (s)
  opacity: number;
};

/** One ambient float: parallax layer → bobbing image. Invisible, edge-anchored, subtle. */
function SiteFloat({
  src,
  alt,
  className,
  progress,
  moveY,
  rotateTo,
  bob,
  bobDur,
  opacity,
}: FloatSpec) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, moveY]);
  const rotate = useTransform(progress, [0, 1], [0, rotateTo]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{ opacity }}
    >
      <motion.div style={reduceMotion ? undefined : { y, rotate }}>
        <motion.img
          src={src}
          alt={alt}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: [0, -bob, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.8 }
              : {
                  opacity: { duration: 0.8 },
                  y: { repeat: Infinity, duration: bobDur, ease: "easeInOut" },
                }
          }
        />
      </motion.div>
    </div>
  );
}

/** Site-wide ambient floats — faint food cutouts drifting along the page edges. */
export default function FloatingAssets() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const floats: Omit<FloatSpec, "progress">[] = [
    {
      src: "/images/dish/killybegs_lemon_clean.png",
      alt: "",
      className: "left-[3%] top-[125vh] w-14 -rotate-12",
      moveY: -40,
      rotateTo: -6,
      bob: 8,
      bobDur: 4.6,
      opacity: 0.22,
    },
    {
      src: "/images/dish/killybegs_calamari_cutout_float.png",
      alt: "",
      className: "right-[4%] top-[215vh] w-20 rotate-10",
      moveY: -80,
      rotateTo: 5,
      bob: 11,
      bobDur: 5.4,
      opacity: 0.21,
    },
    {
      src: "/images/dish/killybegs_mussels_cutout_float.png",
      alt: "",
      className: "left-[5%] top-[305vh] w-16 -rotate-6",
      moveY: -60,
      rotateTo: 4,
      bob: 9,
      bobDur: 5.9,
      opacity: 0.23,
    },
    {
      src: "/images/dish/killybegs_sodabread_cutout_float.png",
      alt: "",
      className: "right-[6%] top-[405vh] w-24 rotate-6",
      moveY: -100,
      rotateTo: -5,
      bob: 10,
      bobDur: 6.2,
      opacity: 0.2,
    },
    {
      src: "/images/dish/killybegs_herbs_clean.png",
      alt: "",
      className: "left-[4%] top-[515vh] w-12 -rotate-8",
      moveY: -45,
      rotateTo: 3,
      bob: 7,
      bobDur: 4.4,
      opacity: 0.22,
    },
    {
      src: "/images/dish/killybegs_crab_cutout_float.png",
      alt: "",
      className: "right-[5%] top-[625vh] w-20 -rotate-10",
      moveY: -85,
      rotateTo: -4,
      bob: 12,
      bobDur: 6.0,
      opacity: 0.21,
    },
    {
      src: "/images/dish/clean_salmon.png",
      alt: "",
      className: "left-[6%] top-[735vh] w-24 rotate-8",
      moveY: -70,
      rotateTo: 5,
      bob: 10,
      bobDur: 5.6,
      opacity: 0.19,
    },
    {
      src: "/images/dish/final2_cod.png",
      alt: "",
      className: "right-[4%] top-[855vh] w-16 rotate-12",
      moveY: -90,
      rotateTo: 6,
      bob: 9,
      bobDur: 5.1,
      opacity: 0.22,
    },
  ];

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {floats.map((f) => (
        <SiteFloat key={f.src} {...f} progress={scrollYProgress} />
      ))}
    </div>
  );
}
