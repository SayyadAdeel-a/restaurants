"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import NextImage from "next/image";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Sauce drops — teardrops hanging off the subtitle ---------- */

function SauceDrops() {
  const drops = [
    { w: 10, h: 17 },
    { w: 13, h: 23 },
    { w: 8, h: 13 },
  ];
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-start gap-7 text-blue"
    >
      {drops.map((d, i) => (
        <svg
          key={i}
          width={d.w}
          height={d.h}
          viewBox="0 0 12 22"
          fill="currentColor"
          className="shrink-0 drop-shadow-[0_2px_0_rgba(61,10,10,0.25)]"
        >
          <path d="M6 0 C 8.8 8, 10.6 11.6, 10 14.6 A 4 4 0 0 1 2 14.6 C 1.4 11.6, 3.2 8, 6 0 Z" />
        </svg>
      ))}
    </span>
  );
}

/* ---------- Ketchup drips — strands hanging off the hero's bottom edge ----------
   Sparse on purpose: the awards ticker and story section stay visible between
   the strands instead of being hidden behind a solid band. */

function KetchupDrips() {
  /* [center x, tip depth] in a 1440×260 viewBox */
  const drips: Array<[number, number]> = [
    [70, 58],
    [180, 122],
    [280, 44],
    [390, 96],
    [500, 172],
    [620, 70],
    [730, 38],
    [840, 142],
    [950, 62],
    [1060, 106],
    [1170, 50],
    [1280, 132],
    [1370, 88],
  ];
  const nubs: Array<[number, number]> = [
    [150, 22],
    [330, 18],
    [560, 26],
    [900, 24],
    [1120, 20],
  ];
  /* Separated drops about to fall off the long strands */
  const falling: Array<[number, number]> = [
    [500, 205],
    [840, 178],
    [1280, 168],
  ];

  const dropPath = (cx: number, tip: number) =>
    `M ${cx - 5} 0 C ${cx - 11} 12, ${cx - 13} 26, ${cx - 8} ${tip - 8} C ${cx - 4} ${tip - 2}, ${cx + 4} ${tip - 2}, ${cx + 8} ${tip - 8} C ${cx + 13} 26, ${cx + 11} 12, ${cx + 5} 0 Z`;
  const nubPath = (cx: number, tip: number) =>
    `M ${cx - 4} 0 C ${cx - 7} 8, ${cx - 8} 14, ${cx - 5} ${tip - 4} C ${cx - 2} ${tip}, ${cx + 2} ${tip}, ${cx + 5} ${tip - 4} C ${cx + 8} 14, ${cx + 7} 8, ${cx + 4} 0 Z`;
  const fallPath = (cx: number, tip: number) =>
    `M ${cx} ${tip - 10} C ${cx + 4} ${tip - 7}, ${cx + 5} ${tip - 4}, ${cx + 3} ${tip - 2} C ${cx + 1} ${tip}, ${cx - 1} ${tip}, ${cx - 3} ${tip - 2} C ${cx - 5} ${tip - 4}, ${cx - 4} ${tip - 7}, ${cx} ${tip - 10} Z`;

  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      aria-hidden
      className="h-full w-full text-blue"
    >
      {drips.map(([cx, tip]) => (
        <path key={`d${cx}`} d={dropPath(cx, tip)} fill="currentColor" />
      ))}
      {nubs.map(([cx, tip]) => (
        <path key={`n${cx}`} d={nubPath(cx, tip)} fill="currentColor" />
      ))}
      {falling.map(([cx, tip]) => (
        <path key={`f${cx}`} d={fallPath(cx, tip)} fill="currentColor" />
      ))}
    </svg>
  );
}

/* ---------- Floating ingredient cutouts — small assets drifting around the hero ---------- */

function FloatingAsset({
  src,
  className,
  rotate = 0,
  dur = 6,
  delay = 0,
  amp = 10,
  imgW = 1920,
  imgH = 1280,
  progress,
  parallax = 30,
}: {
  src: string;
  className: string;
  rotate?: number;
  dur?: number;
  delay?: number;
  amp?: number;
  imgW?: number;
  imgH?: number;
  progress: MotionValue<number>;
  parallax?: number;
}) {
  const reduceMotion = useReducedMotion();
  /* Scroll drift — each asset moves up at its own speed while scrolling */
  const parallaxY = useTransform(progress, [0, 1], [0, -parallax]);
  return (
    <motion.div
      aria-hidden
      style={reduceMotion ? { rotate } : { rotate, y: parallaxY }}
      className={`pointer-events-none absolute z-0 will-change-transform ${className}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -amp, 0] }}
        transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay }}
      >
        <NextImage
          src={src}
          alt=""
          width={imgW}
          height={imgH}
          sizes="96px"
          className="h-auto w-full object-contain drop-shadow-[0_16px_28px_rgba(61,10,10,0.22)]"
        />
      </motion.div>
    </motion.div>
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

      {/* Floating ingredients — small assets drifting around the sides */}
      <FloatingAsset
        src="/images/burger_cheese.png"
        className="left-[4%] top-[22%] w-12 sm:w-14 md:left-[9%] md:w-16"
        rotate={-12}
        dur={6}
        progress={scrollYProgress}
        parallax={28}
      />
      <FloatingAsset
        src="/images/burger_bacon.png"
        className="left-[1.5%] top-[39%] w-10 sm:w-12 md:left-[7%] md:w-14"
        rotate={8}
        dur={5}
        delay={0.4}
        progress={scrollYProgress}
        parallax={60}
      />
      <FloatingAsset
        src="/images/jacks_asset_onion_rings.png"
        className="left-[5%] top-[55%] w-12 sm:w-14 md:left-[11%] md:w-16"
        rotate={12}
        dur={6.5}
        delay={1}
        imgW={1600}
        imgH={1600}
        progress={scrollYProgress}
        parallax={42}
      />
      <FloatingAsset
        src="/images/jacks_asset_lettuce.png"
        className="right-[4%] top-[21%] w-12 sm:w-14 md:right-[9%] md:w-16"
        rotate={12}
        dur={5.5}
        delay={0.2}
        progress={scrollYProgress}
        parallax={32}
      />
      <FloatingAsset
        src="/images/burger_tomato.png"
        className="right-[1.5%] top-[38%] w-10 sm:w-12 md:right-[7%] md:w-14"
        rotate={-8}
        dur={6}
        delay={0.8}
        progress={scrollYProgress}
        parallax={55}
      />
      <FloatingAsset
        src="/images/jacks_asset_pickle_lemon.png"
        className="right-[5%] top-[54%] w-12 sm:w-14 md:right-[11%] md:w-16"
        rotate={-12}
        dur={5}
        delay={0.5}
        progress={scrollYProgress}
        parallax={48}
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
          <motion.span {...fadeUp(0.36)} className="relative mt-5 inline-block">
            <span className="relative z-10 block font-retro text-[clamp(1.05rem,2.2vw,1.6rem)] leading-tight text-blue [text-shadow:0_2px_0_rgba(61,10,10,0.3)]">
              (and Maybe a Little Sauce on Your Chin)
            </span>
            <SauceDrops />
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
              1,000+ 5-Star Reviews
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

      {/* Ketchup drips — hanging off the hero's bottom edge, over the awards
          ticker and into the dark story section */}
      <div className="pointer-events-none absolute inset-x-0 top-full z-20 -mt-px h-[150px] md:h-[190px]">
        <KetchupDrips />
      </div>
    </section>
  );
}
