"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
  const reduceMotion = useReducedMotion();

  // Gentle parallax drift on the burger while scrolling
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  // Entrance timeline — same language as the other sections
  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });
      tl.from("#story-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(
          "#story-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          0.25
        )
        .from("#story-body", { y: 18, opacity: 0, duration: 0.7 }, 0.6)
        .from("#story-stats", { y: 16, opacity: 0, duration: 0.6 }, 0.75)
        .from("#story-cta", { y: 14, opacity: 0, duration: 0.6 }, 0.9)
        .from(
          "#story-visual-inner",
          { scale: 0.92, opacity: 0, duration: 1.1, ease: "power2.out" },
          0.45
        );
    },
    { scope: rootRef }
  );

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
              id="story-visual-inner"
              ref={visualRef}
              className="relative will-change-transform"
              animate={
                reduceMotion || !visualInView ? undefined : { y: [0, -12, 0] }
              }
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <NextImage
                src="/images/jacks_smash_burger_cutout.png"
                alt="Jack's signature smash burger"
                width={1600}
                height={1600}
                priority
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
        </div>

        {/* Right — copy */}
        <div className="order-1 max-w-xl lg:order-2">
          <p
            id="story-eyebrow"
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · The Story
          </p>

          <h2
            id="story-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Born on the</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">High Street.</em>
              </span>
            </span>
          </h2>

          <p
            id="story-body"
            className="mt-5 max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Jack&rsquo;s started with one idea: proper burgers, done properly.
            100% British &amp; Irish beef, flame-grilled to order and stacked
            between fresh-baked brioche — no freezers, no fillers, no
            shortcuts. Served fast from high-street kitchens across the UK, one
            made-right burger at a time.
          </p>

          {/* Stats */}
          <div
            id="story-stats"
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
          </div>

          {/* CTA */}
          <div id="story-cta" className="mt-9">
            <a
              href="#menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-cream/25 px-7 text-sm font-medium text-cream transition-all duration-300 hover:border-cream/50 hover:bg-white/10"
            >
              See the Menu
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
