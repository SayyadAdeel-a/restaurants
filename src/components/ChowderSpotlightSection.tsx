"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Trophy, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ingredients = [
  { name: "Smoked Haddock", note: "kildimo-style, flaked in" },
  { name: "Wild Atlantic Salmon", note: "caught off Donegal" },
  { name: "Donegal Blue Mussels", note: "from the harbour below" },
];

/** Steam wisps rising from the bowl — pure CSS keyframes, staggered. */
function Steam() {
  const wisps = [
    { left: "38%", dur: 4.2, delay: 0, scale: 1 },
    { left: "52%", dur: 5.1, delay: 0.9, scale: 1.25 },
    { left: "64%", dur: 4.6, delay: 1.8, scale: 0.9 },
    { left: "46%", dur: 5.6, delay: 2.6, scale: 1.1 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2/3 overflow-hidden">
      {wisps.map((w, i) => (
        <span
          key={i}
          className="steam-wisp absolute bottom-6 h-24 w-16 rounded-full"
          style={{
            left: w.left,
            ["--dur" as string]: `${w.dur}s`,
            ["--delay" as string]: `${w.delay}s`,
            ["--scl" as string]: w.scale,
          }}
        />
      ))}
    </div>
  );
}

export default function ChowderSpotlightSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const bowlY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const musselsY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#spotlight-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#spotlight-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from("#spotlight-ingredients", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.6)
        .from("#spotlight-bowl-inner", { scale: 0.9, opacity: 0, duration: 1.1, ease: "power2.out" }, 0.4);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="chowder"
      ref={rootRef}
      className="grain relative overflow-hidden bg-[#0A2342] py-24 lg:py-36"
    >
      {/* Deep glow behind the bowl */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[28%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/15 blur-3xl"
      />

      {/* Floating mussels — bottom-right */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: musselsY }}
        className="pointer-events-none absolute right-[6%] bottom-[8%] z-0 w-28 opacity-40 lg:w-36"
      >
        <motion.img
          src="/images/dish/final2_mussels.png"
          alt=""
          animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="w-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.35)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Left — the bowl with steam + slow rotation */}
        <motion.div style={reduceMotion ? undefined : { y: bowlY }} className="relative order-2 lg:order-1">
          <div
            id="spotlight-bowl-inner"
            className="relative mx-auto w-[min(72vw,460px)]"
          >
            {/* Halo */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue/10 blur-2xl"
            />

            {/* Bowl — slowly rotates ±2deg via CSS */}
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: [0, 2, 0, -2, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { repeat: Infinity, duration: 14, ease: "easeInOut" }
              }
              className="relative aspect-square"
            >
              <NextImage
                src="/images/dish/spotlight_chowder.webp"
                alt="Killybegs award-winning seafood chowder — smoked haddock, wild salmon and Donegal blue mussels"
                fill
                sizes="(max-width: 1024px) 72vw, 460px"
                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
              />
              <Steam />
            </motion.div>

            {/* Gold champion seal */}
            <div className="absolute -top-4 -right-4 z-30 sm:-right-6">
              <Badge className="flex items-center gap-1.5 border border-gold/50 bg-navy-950/90 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-gold uppercase shadow-lg shadow-black/30 backdrop-blur">
                <Trophy className="size-3.5" />
                All-Ireland Champion
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Right — awards + ingredients */}
        <motion.div style={reduceMotion ? undefined : { y: copyY }} className="order-1 lg:order-2">
          <p
            id="spotlight-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-cream/60 uppercase"
          >
            <Droplets className="size-3.5 text-blue" />
            04 — The Champion
          </p>

          <h2
            id="spotlight-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Ireland&rsquo;s best</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">seafood chowder.</em>
              </span>
            </span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/65 sm:text-lg">
            Donegal&rsquo;s Best Chowder 2018 — then the big one, twice:
            <strong className="font-semibold text-gold"> All-Ireland Champion 2019 &amp; 2020.</strong>
          </p>

          {/* Ingredients */}
          <div id="spotlight-ingredients" className="mt-8 space-y-3">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="flex items-baseline justify-between gap-6 border-b border-cream/10 pb-3"
              >
                <span className="font-serif text-lg text-cream italic">{ing.name}</span>
                <span className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">
                  {ing.note}
                </span>
              </div>
            ))}
          </div>

          {/* Soda bread — the traditional side */}
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-16 w-24 shrink-0">
              <NextImage
                src="/images/dish/spotlight_sodabread.webp"
                alt="Traditional Irish soda bread"
                fill
                sizes="96px"
                className="object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)]"
              />
            </div>
            <p className="text-sm leading-relaxed text-cream/55">
              In a rich, creamy base — with traditional homemade
              <em className="font-serif text-cream italic"> Irish soda bread</em> on the side.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
