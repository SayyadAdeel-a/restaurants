"use client";

import { motion, useReducedMotion } from "framer-motion";

const awards = [
  "Flame-Grilled British Beef",
  "1,000+ 5-Star Reviews",
  "Burgers Made to Order",
  "Fresh Daily · Never Frozen",
  "100% British & Irish Beef",
];

/** One full pass of the marquee content. */
function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {awards.map((award) => (
        <span
          key={award}
          className="flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
        >
          <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.28em] text-blue uppercase sm:text-[11px]">
            {award}
          </span>
          <span aria-hidden className="size-1.5 rotate-45 bg-blue/70" />
        </span>
      ))}
    </div>
  );
}

export default function AwardsTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 overflow-hidden border-y border-cream/10 bg-navy-950 py-3">
      {reduceMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-center">
          {awards.map((award) => (
            <span
              key={award}
              className="whitespace-nowrap font-mono text-[10px] tracking-[0.28em] text-blue uppercase"
            >
              {award}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
        >
          <Row />
          <Row />
        </motion.div>
      )}
    </div>
  );
}
