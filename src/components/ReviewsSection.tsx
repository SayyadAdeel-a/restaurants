"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import NextImage from "next/image";
import { ArrowRight, Star } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Restaurant_Review-g211874-d12519106-Reviews-Killybegs_Seafood_Shack-Killybegs_County_Donegal.html";

/* ---------- Scatter layer (same as Bestsellers — carried over) ---------- */

type ScatterProps = {
  posCls: string;
  parallax: number;
  orbit: number;
  orbitDur: number;
  rotate: number;
  children: ReactNode;
  progress: MotionValue<number>;
};

function Scatter({
  posCls,
  parallax,
  orbit,
  orbitDur,
  rotate,
  children,
  progress,
}: ScatterProps) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, parallax]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${posCls}`}
    >
      <motion.div style={reduceMotion ? undefined : { y }}>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, orbit, 0, -orbit, 0],
                  y: [0, -orbit * 0.7, 0, orbit * 0.7, 0],
                }
          }
          transition={{
            repeat: Infinity,
            duration: orbitDur,
            ease: "easeInOut",
          }}
          style={{ rotate }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Avatar circle ---------- */

function Avatar({ initials, tone }: { initials: string; tone: string }) {
  return (
    <span
      className={`flex size-10 items-center justify-center rounded-full text-[11px] font-semibold text-cream ring-2 ring-cream shadow-md sm:size-11 ${tone}`}
    >
      {initials}
    </span>
  );
}

/* ---------- Section ---------- */

export default function ReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Shared scroll progress for the parallax on the bowl + edge scatters
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const bowlY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });
      tl.from("#rev-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(
          "#rev-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          0.25
        )
        .from("#rev-stars", { y: 14, opacity: 0, duration: 0.6 }, 0.6)
        .from("#rev-quote", { y: 22, opacity: 0, duration: 0.8 }, 0.7)
        .from("#rev-author", { y: 12, opacity: 0, duration: 0.5 }, 0.95)
        .from(
          "#rev-avatars",
          { scale: 0.5, opacity: 0, duration: 0.55, stagger: 0.2, ease: "back.out(2)" },
          1.05
        )
        .from("#rev-badges", { y: 12, opacity: 0, duration: 0.5 }, 1.35)
        .from("#rev-cta", { y: 14, opacity: 0, duration: 0.6 }, 1.5)
        .from(
          "#rev-bowl-inner",
          { scale: 0.92, opacity: 0, duration: 1.1, ease: "power2.out" },
          0.45
        );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      {/* Soft blue glow behind the bowl */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[28%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/25 blur-3xl"
      />

      {/* Edge scatters — same six assets drifting down from Bestsellers */}
      <Scatter
        posCls="left-[4%] top-[12%] w-14 sm:left-[6%] sm:w-16"
        parallax={-45}
        orbit={8}
        orbitDur={5.4}
        rotate={-12}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_lemon_clean.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[5%] top-[14%] w-12 sm:right-[8%] sm:w-14"
        parallax={-65}
        orbit={7}
        orbitDur={3.2}
        rotate={10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_herbs_clean.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="left-[5%] bottom-[10%] w-16 sm:left-[8%] sm:w-20"
        parallax={-45}
        orbit={9}
        orbitDur={5.8}
        rotate={8}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_mussels_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[5%] bottom-[12%] w-14 sm:right-[8%] sm:w-16"
        parallax={-65}
        orbit={7}
        orbitDur={3.4}
        rotate={-8}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_crab_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="left-[12%] top-[48%] w-14 sm:left-[16%] sm:w-16"
        parallax={-45}
        orbit={8}
        orbitDur={6.2}
        rotate={6}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_sodabread_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[10%] top-[50%] w-14 sm:right-[14%] sm:w-16"
        parallax={-65}
        orbit={9}
        orbitDur={3.6}
        rotate={-10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/dish/killybegs_calamari_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      </Scatter>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:px-10">
        {/* Left — the huge chowder bowl */}
        <div className="relative order-2 mx-auto w-[min(78vw,430px)] lg:order-1 lg:w-[min(40vw,520px)]">
          <motion.div style={reduceMotion ? undefined : { y: bowlY }}>
            {/* Bowl — floats forever on a slow 8s cycle */}
            <motion.div
              id="rev-bowl-inner"
              className="relative"
              animate={reduceMotion ? undefined : { y: [0, -15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            >
              <NextImage
                src="/images/dish/killybegs_chowder_bowl.png"
                alt="Killybegs award-winning seafood chowder"
                width={1600}
                height={1600}
                priority
                sizes="(max-width: 1024px) 78vw, 520px"
                className="relative h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
              />

              {/* Award tag — bespoke, like the Bestsellers champion chip */}
              <span className="absolute -top-3 right-0 rotate-6 rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase shadow-lg shadow-gold/25">
                ✦ Award-Winning Chowder
              </span>

              {/* Basil + lemon drifting around the bowl */}
              <motion.img
                src="/images/dish/killybegs_herbs_clean.png"
                alt=""
                className="absolute -left-6 top-[14%] w-14 -rotate-12 drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] sm:-left-10 sm:w-16"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              />
              <motion.img
                src="/images/dish/killybegs_lemon_clean.png"
                alt=""
                className="absolute -right-4 bottom-[12%] w-12 rotate-12 drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] sm:-right-8 sm:w-14"
                animate={reduceMotion ? undefined : { y: [0, 9, 0] }}
                transition={{ repeat: Infinity, duration: 5.1, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right — social proof */}
        <div className="order-1 max-w-xl lg:order-2">
          <p
            id="rev-eyebrow"
            className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            Killybegs Harbour · Social Proof
          </p>

          <h2
            id="rev-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">            TripAdvisor&rsquo;s #1.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">A Thousand Reasons.</em>
              </span>
            </span>
          </h2>

          {/* Rope logo + award line — same bespoke touch as Bestsellers */}
          <div className="mt-5 flex items-center gap-2.5">
            <span className="relative block size-7 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-gold/50">
              <NextImage
                src="/images/logo.jpg"
                alt=""
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-navy-800/60 uppercase">
              All-Ireland Chowder Champion · 2019 &amp; 2020
            </span>
          </div>

          {/* Stars */}
          <div id="rev-stars" className="mt-6 flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-mono text-lg font-medium text-navy-800">
              4.9 / 5
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-navy-800/50 uppercase">
              from 1,000+ reviews
            </span>
          </div>

          {/* Real TripAdvisor quote */}
          <blockquote id="rev-quote" className="mt-8">
            <p className="font-serif text-2xl leading-snug text-navy-800 italic sm:text-[1.75rem]">
              “Best chowder we had in Ireland. Fresh, creamy, packed with
              mussels. Worth the detour to Old Pier.”
            </p>
            <footer
              id="rev-author"
              className="mt-4 font-mono text-[11px] tracking-[0.26em] text-navy-800/60 uppercase"
            >
              — Sarah M. · TripAdvisor
            </footer>
          </blockquote>

          {/* Avatars + badges */}
          <div className="mt-8 flex items-center gap-3">
            <div id="rev-avatars" className="flex -space-x-3">
              <Avatar initials="SM" tone="bg-navy-800" />
              <Avatar initials="KM" tone="bg-navy-600" />
              <Avatar initials="JP" tone="bg-blue" />
            </div>
            <p className="text-sm text-navy-800/60">
              Loved by <span className="font-semibold text-navy-800">1,000+</span>{" "}
              pier-side regulars
            </p>
          </div>

          <div id="rev-badges" className="mt-6 flex flex-wrap items-center gap-3">
            {/* TripAdvisor badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 shadow-[0_8px_30px_rgba(27,29,58,0.08)]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#00af87] font-sans text-[9px] font-bold text-white">
                TA
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-navy-800 uppercase">
                TripAdvisor · #1 Quick Bite
              </span>
            </span>
            {/* Champion badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Star className="size-3.5 fill-gold text-gold" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
                2× Champion · 2019 &amp; 2020
              </span>
            </span>
          </div>

          {/* CTA */}
          <div id="rev-cta" className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
            >
              Read Reviews
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy-800/20 px-7 text-sm font-medium text-navy-800 transition-all duration-300 hover:border-navy-800/40 hover:bg-white"
            >
              Find Us on Old Pier
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
