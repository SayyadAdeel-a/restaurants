"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

const stats = [
  { value: "Est. 2024", label: "Born on the high street" },
  { value: "100%", label: "British & Irish beef, never frozen" },
  { value: "Made to order", label: "Flame-grilled the moment you order" },
];

/* ---------- Component ---------- */

export default function StorySection() {
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInView = useInView(visualRef, { margin: "200px 0px" });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  // Gentle parallax drift on the burger while scrolling
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      id="story"
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950 py-24 lg:py-36"
    >
      {/* Soft red glow behind the burger */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[26%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — the burger with ingredient garnish */}
        <div className="order-2 mx-auto w-[min(78vw,430px)] lg:order-1 lg:w-[min(40vw,520px)]">
          <motion.div style={reduceMotion ? undefined : { y: visualY }}>
            <motion.div
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
            <motion.div
              id="story-visual-inner"
              ref={visualRef}
              className="relative will-change-transform"
              animate={
                reduceMotion || !visualInView ? undefined : { y: [0, -12, 0] }
              }
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <NextImage
                src="/images/jacks_top_burger_transparent.png"
                alt="Jack's signature smash burger, stacked high"
                width={1600}
                height={914}
                sizes="(max-width: 1024px) 78vw, 520px"
                className="relative h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
              />

              {/* Est. badge */}
              <span className="absolute -top-3 right-0 rotate-6 rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase shadow-lg shadow-gold/25">
                ✦ Est. 2024
              </span>

              {/* Ingredient garnish drifting around the burger */}
              <motion.div
                className="absolute -left-4 top-[16%] w-12 -rotate-12 sm:-left-8 sm:w-14 will-change-transform"
                animate={
                  reduceMotion || !visualInView ? undefined : { y: [0, -8, 0] }
                }
                transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/burger_bacon.png"
                  alt=""
                  width={1920}
                  height={1280}
                  sizes="64px"
                  className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
              <motion.div
                className="absolute -right-3 bottom-[10%] w-14 rotate-12 sm:-right-6 sm:w-16 will-change-transform"
                animate={
                  reduceMotion || !visualInView ? undefined : { y: [0, 9, 0] }
                }
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/burger_cheese.png"
                  alt=""
                  width={1920}
                  height={1280}
                  sizes="64px"
                  className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — copy */}
        <div className="order-1 max-w-xl lg:order-2">
          <motion.p
            id="story-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · The Story
          </motion.p>

          <h2
            id="story-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Born on the
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">High Street.</em>
              </motion.span>
            </span>
          </h2>

          <motion.p
            id="story-body"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-5 max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Jack&rsquo;s started with one idea: proper burgers, done properly.
            100% British &amp; Irish beef, flame-grilled to order and stacked
            between fresh-baked brioche — no freezers, no fillers, no
            shortcuts. Served fast from high-street kitchens across the UK, one
            made-right burger at a time.
          </motion.p>

          {/* Stats */}
          <motion.div
            id="story-stats"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
            className="mt-8 grid max-w-md grid-cols-3 gap-6"
          >
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-serif text-2xl font-semibold text-cream sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-cream/50">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            id="story-cta"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
            className="mt-9"
          >
            <a
              href="#menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-cream/25 px-7 text-sm font-medium text-cream transition-all duration-300 hover:border-cream/50 hover:bg-white/10"
            >
              See the Menu
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
