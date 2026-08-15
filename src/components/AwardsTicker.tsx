"use client";

import { motion, useReducedMotion } from "framer-motion";

const awards = [
  "All-Ireland Chowder Champion 2019 & 2020",
  "Donegal's Best 2018",
  "TripAdvisor #1 Quick Bite",
  "1,000+ Reviews",
  "Chef ex-Claridge's, Gordon Ramsay",
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
          <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.28em] text-cream/80 uppercase sm:text-[11px]">
            {award}
          </span>
          <span aria-hidden className="size-1.5 rotate-45 bg-gold/70" />
        </span>
      ))}
    </div>
  );
}

export default function AwardsTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 overflow-hidden border-y border-navy-800/20 bg-navy-950 py-3">
      {reduceMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-center">
          {awards.map((award) => (
            <span
              key={award}
              className="whitespace-nowrap font-mono text-[10px] tracking-[0.28em] text-cream/80 uppercase"
            >
              {award}
            </span>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-max"
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
