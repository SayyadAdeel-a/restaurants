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
import { Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------- Sauce drip — red dripping texture behind the headline ---------- */

function SauceDrip({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 220"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Irregular ketchup splat body */}
      <path
        d="M30 70 C20 40 50 20 100 25 C130 15 170 5 220 10 C270 -5 320 10 380 5 C430 15 480 0 530 20 C580 15 620 40 600 80 C630 100 580 125 540 115 C490 130 450 110 400 125 C350 115 300 135 250 120 C200 130 150 115 100 125 C50 130 20 105 30 70 Z"
        fill="currentColor"
      />
      
      {/* Jagged edge details */}
      <path d="M80 20 C70 0 95 5 100 20 Z" fill="currentColor" />
      <path d="M300 10 C310 -10 330 -5 330 10 Z" fill="currentColor" />
      <path d="M490 15 C480 -5 510 -10 520 10 Z" fill="currentColor" />

      {/* Attached drips — with one long dramatic drip */}
      <path d="M125 120 Q135 155 145 120 Z" fill="currentColor" />
      <path d="M295 118 Q305 210 315 118 Z" fill="currentColor" />
      <path d="M500 120 Q505 160 515 120 Z" fill="currentColor" />

      {/* 2 separate falling drips */}
      <path d="M220 140 Q215 152 215 156 A5 5 0 0 0 225 156 Q225 152 220 140 Z" fill="currentColor" />
      <path d="M430 135 Q426 148 426 151 A4 4 0 0 0 434 151 Q434 148 430 135 Z" fill="currentColor" />
    </svg>
  );
}

/* ---------- Flame — shared, rising from the bottom of yellow chapters ---------- */

/* ---------- Black sticker badge — Top Chefs / High Quality / Finest Ingredients ---------- */

type StickerProps = {
  text: string;
  className?: string;
  rotate?: number;
  size?: string;
};

function Sticker({ text, className, rotate = -8, size = "size-32 sm:size-36" }: StickerProps) {
  return (
    <div
      aria-hidden
      style={{ rotate: `${rotate}deg` }}
      className={`pointer-events-none absolute z-20 flex ${size} items-center justify-center rounded-full bg-black text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] ring-4 ring-white/20 ${className}`}
    >
      <div className="px-3 text-center">
        <Star className="mx-auto size-4 fill-jacks text-jacks" />
        <p className="mt-1.5 font-retro text-[12px] leading-[1.15] tracking-wide whitespace-pre-line uppercase sm:text-[13px]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const plateInView = useInView(plateRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-jacks px-5 pt-28 pb-20 sm:px-6 lg:px-10"
    >
      {/* Flame glow — orange/red heat rising from the bottom, not pink */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,26,0.5),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-[radial-gradient(ellipse_at_bottom,rgba(237,28,36,0.4),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left — copy */}
        <div className="relative text-center lg:text-left">
          {/* Real retro logo */}
          <div className="flex items-center justify-center lg:justify-start">
            <NextImage
              src="/images/Logo_300.png"
              alt="Jack's Burger UK"
              width={300}
              height={144}
              sizes="220px"
              className="h-12 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:h-16"
            />
          </div>

          <p className="mt-4 font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase">
            Welcome To Jack&rsquo;s Burger · Flame-Grilled &amp; Properly Messy
          </p>

          {/* Headline with the sauce drip behind it */}
          <div className="relative mt-6">
            <h1 className="relative z-10">
              <span className="block text-[clamp(2.5rem,6.4vw,4.9rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-ink">
                Where Passion Meets Flavour
              </span>
              <span className="relative mt-4 block w-fit">
                <SauceDrip className="pointer-events-none absolute -inset-x-8 -top-4 z-0 w-[calc(100%+64px)] scale-110 -rotate-3 text-blue" />
                <span className="relative z-10 font-retro text-[clamp(1.2rem,2.6vw,1.95rem)] leading-[1.15] text-white [text-shadow:0_3px_0_rgba(61,10,10,0.4)]">
                  (and Maybe a Little Sauce on Your Chin)
                </span>
              </span>
            </h1>
          </div>

          {/* Sub — mt-16 clears the drips hanging off the headline */}
          <p className="mx-auto mt-16 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg lg:mx-0">
            With over a decade of mastery in the food industry and a shelf full
            of awards, we&rsquo;ve perfected the art of an unforgettable burger
            experience. At Jack&rsquo;s Burger, we live to see you smile — one
            delicious bite at a time.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button className="h-12 rounded-full bg-ink px-9 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-950 hover:shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
              <Utensils className="size-4" />
              Order Online
            </Button>
            <a
              href="#menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/25 px-7 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              See the Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right — the messy flame-grilled burger, fries behind, stickers on top */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <motion.div
            ref={plateRef}
            style={reduceMotion ? undefined : { y: plateY }}
            className="relative will-change-transform"
          >
            <div className="relative mx-auto w-[min(80vw,540px)]">
              {/* Fries peeking out behind the burger */}
              <motion.div
                aria-hidden
                className="absolute -left-10 bottom-8 z-0 w-40 -rotate-12 sm:-left-14 sm:w-48"
                animate={
                  reduceMotion || !plateInView ? undefined : { y: [0, -10, 0] }
                }
                transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/jacks_scroll02_transparent_v2.png"
                  alt=""
                  width={1600}
                  height={952}
                  sizes="192px"
                  className="h-auto w-full object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.22)]"
                />
              </motion.div>

              {/* The star of the show — saucy, dripping, flame-grilled */}
              <motion.div
                className="relative z-10"
                animate={
                  reduceMotion || !plateInView ? undefined : { y: [0, -14, 0] }
                }
                transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/jacks_scroll01_transparent_v2.png"
                  alt="Jack's flame-grilled smash burger, dripping with sauce — the signature stack"
                  width={1600}
                  height={1066}
                  preload
                  loading="eager"
                  sizes="(max-width: 1024px) 80vw, 540px"
                  className="relative h-auto w-full object-contain drop-shadow-[0_44px_80px_rgba(61,10,10,0.35)]"
                />
              </motion.div>

              {/* Black sticker badges */}
              <Sticker
                text={"Top\nChefs"}
                rotate={-12}
                className="top-[2%] -left-2 sm:-left-6"
              />
              <Sticker
                text={"High\nQuality"}
                rotate={9}
                className="top-[30%] -right-2 sm:-right-8"
              />
              <Sticker
                text={"Finest\nIngredients"}
                rotate={-6}
                size="size-36 sm:size-40"
                className="bottom-[6%] -left-4 sm:left-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
