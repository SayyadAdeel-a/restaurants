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
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { y: 18, opacity: 0 },
    animate: reduceMotion ? undefined : { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center overflow-x-clip bg-jacks px-5 pt-28 pb-24 sm:px-6 lg:px-10"
    >
      {/* Flame glow — orange/red heat rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,26,0.5),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-[radial-gradient(ellipse_at_bottom,rgba(237,28,36,0.4),transparent_65%)]"
      />
      {/* Soft glow behind the headline for lift off the yellow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[15%] left-1/2 h-[380px] w-[min(88vw,760px)] -translate-x-1/2 rounded-full bg-white/35 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Real retro logo */}
        <motion.div {...fadeUp(0)}>
          <NextImage
            src="/images/Logo_300.png"
            alt="Jack's Burger UK"
            width={300}
            height={144}
            sizes="200px"
            loading="eager"
            className="h-14 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:h-16"
          />
        </motion.div>

        <motion.p
          {...fadeUp(0.12)}
          className="mt-5 font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase"
        >
          Welcome To Jack&rsquo;s Burger · Flame-Grilled &amp; Properly Messy
        </motion.p>

        <h1 className="mt-6">
          <motion.span
            {...fadeUp(0.2)}
            className="block text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink"
          >
            Where Passion
          </motion.span>
          <motion.span
            {...fadeUp(0.28)}
            className="block text-[clamp(2.4rem,6.2vw,4.8rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink"
          >
            Meets Flavour
          </motion.span>
          <motion.span
            {...fadeUp(0.36)}
            className="mt-5 block font-retro text-[clamp(1.05rem,2.2vw,1.6rem)] leading-tight text-blue [text-shadow:0_2px_0_rgba(61,10,10,0.3)]"
          >
            (and Maybe a Little Sauce on Your Chin)
          </motion.span>
        </h1>

        {/* The burger — flanked by the story on each side */}
        <div className="mt-10 grid w-full items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12 lg:gap-20">
          <motion.div
            {...fadeUp(0.4)}
            className="mx-auto max-w-xs md:max-w-[14rem] md:text-left"
          >
            <p className="font-retro text-lg leading-tight tracking-wide text-ink uppercase sm:text-xl">
              A Decade
              <br />
              of Mastery
            </p>
            <span
              aria-hidden
              className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-blue sm:mt-3 md:mx-0"
            />
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base md:mt-4">
              With over a decade of mastery in the food industry and a shelf
              full of awards, we&rsquo;ve perfected the art of an
              unforgettable burger experience.
            </p>
            <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink/50 uppercase md:justify-start">
              <span aria-hidden className="size-1.5 rotate-45 bg-blue/70" />
              Est. 2024 · Brynteg
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { scale: 0.94, opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="mx-auto w-[min(64vw,360px)] sm:w-[min(48vw,420px)] md:w-[min(38vw,380px)] lg:w-[min(26vw,400px)]"
          >
            <motion.div
              ref={plateRef}
              style={reduceMotion ? undefined : { y: plateY }}
              className="relative will-change-transform"
            >
              <motion.div
                className="relative"
                animate={
                  reduceMotion || !plateInView ? undefined : { y: [0, -14, 0] }
                }
                transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/jacks_messy_hero_burger.png"
                  alt="Jack's flame-grilled smash burger, properly messy with cheddar leaking and sauce dripping"
                  width={1600}
                  height={1066}
                  preload
                  loading="eager"
                  sizes="(max-width: 640px) 64vw, (max-width: 1024px) 48vw, 400px"
                  className="relative h-auto w-full object-contain drop-shadow-[0_50px_90px_rgba(61,10,10,0.4)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            {...fadeUp(0.5)}
            className="mx-auto max-w-xs md:max-w-[14rem] md:text-left"
          >
            <p className="font-retro text-lg leading-tight tracking-wide text-ink uppercase sm:text-xl">
              One Bite
              <br />
              at a Time
            </p>
            <span
              aria-hidden
              className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-blue sm:mt-3 md:mx-0"
            />
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base md:mt-4">
              At Jack&rsquo;s Burger, we live to see you smile — one delicious
              bite at a time.
            </p>
            <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink/50 uppercase md:justify-start">
              <span aria-hidden className="size-1.5 rotate-45 bg-blue/70" />
              100% Halal-Certified
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
