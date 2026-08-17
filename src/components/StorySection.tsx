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
import Flame from "@/components/Flame";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

const stats = [
  { value: "Est. 2024", label: "Born on the high street" },
  { value: "100%", label: "Halal-certified ingredients" },
  { value: "Smashed to order", label: "Tender & juicy, every time" },
];

/* ---------- Component ---------- */

export default function StorySection() {
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualInView = useInView(visualRef, { margin: "200px 0px" });


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
      {/* Flame glow — orange/red heat rising from the bottom, like the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,26,0.45),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[radial-gradient(ellipse_at_bottom,rgba(237,28,36,0.35),transparent_65%)]"
      />
      {/* Flame shapes licking up the edges */}
      <Flame className="absolute bottom-0 left-[5%] w-16 text-flame/80 sm:w-20" />
      <Flame className="absolute right-[6%] bottom-0 w-20 text-blue/60 sm:w-24" />
      <Flame className="absolute right-[38%] bottom-0 hidden w-12 text-flame/70 md:block" />

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
                className="relative h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(61,10,10,0.3)]"
              />

              {/* Est. badge */}
              <span className="absolute -top-3 right-0 rotate-6 rounded-full bg-jacks px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-ink uppercase shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
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
            className="font-mono text-[11px] tracking-[0.32em] text-cream/60 uppercase"
          >
            Jack&rsquo;s Burger UK · The Story
          </motion.p>

          <h2
            id="story-title"

            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Born on the
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
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
            className="mt-5 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            Jack&rsquo;s Burger isn&rsquo;t just food — it&rsquo;s a vibe.
            We&rsquo;re kicking off in North Wales, but soon we&rsquo;ll be
            smashing burgers across the UK and beyond. Hop aboard this tasty
            rocket and let&rsquo;s make burger history.
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
                <p className="font-serif text-2xl font-bold text-cream sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-cream/60">
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
              className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-cream/25 px-7 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream hover:text-navy-950"
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
