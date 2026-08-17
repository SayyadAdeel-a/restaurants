"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scatter from "@/components/Scatter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Data ---------- */

type Box = {
  src: string;
  alt: string;
  name: string;
  desc: string;
  price: string;
  dur: number; // float cycle length (s) — 5, 6, 7 so they never sync
  wCls: string; // width
  imgW: number;
  imgH: number;
  champion?: boolean;
};

const boxes: Box[] = [
  {
    src: "/images/jacks_chicken_burger_cutout.png",
    alt: "The Chicken Burger — buttermilk-fried chicken, slaw and hot honey mayo",
    name: "The Chicken Burger",
    desc: "Buttermilk-fried chicken, crunchy slaw & hot honey mayo",
    price: "£8.95",
    dur: 5,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1920,
    imgH: 1280,
  },
  {
    src: "/images/jacks_smash_burger_cutout.png",
    alt: "The Smash Burger — double flame-grilled beef, melted cheddar and house sauce",
    name: "The Smash Burger",
    desc: "Double flame-grilled beef, melted cheddar, house sauce",
    price: "£8.50",
    dur: 6,
    wCls: "w-56 md:w-52 lg:w-[17.6rem]", // 10% bigger — the bestseller
    imgW: 1600,
    imgH: 1600,
    champion: true,
  },
  {
    src: "/images/jacks_fries_cutout.png",
    alt: "The Fries — skin-on, double-cooked with Jack's signature seasoning",
    name: "The Fries",
    desc: "Skin-on, double-cooked with Jack's signature seasoning",
    price: "£3.50",
    dur: 7,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1920,
    imgH: 1280,
  },
];

type Scatter = {
  posCls: string; // absolute position + size
  speed: "slow" | "fast";
  parallax: number; // scroll drift px
  orbit: number; // idle orbit amplitude (px)
  orbitDur: number; // idle orbit duration (s)
  rotate: number;
  children: ReactNode;
};

/* ---------- Component ---------- */

export default function BoxesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const boxesInView = useInView(boxesRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  // One shared scroll progress → per-scatter parallax (fast = 1.5× slow)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const scatters: Scatter[] = [
    {
      posCls: "left-[5%] top-[22%] w-8 sm:left-[7%] sm:w-10",
      speed: "slow",
      parallax: -40,
      orbit: 8,
      orbitDur: 6.2,
      rotate: -12,
      children: (
        /* eslint-disable @next/next/no-img-element */
        <img
          src="/images/svg-2.svg"
          alt=""
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[6%] top-[18%] w-7 sm:right-[9%] sm:w-9",
      speed: "fast",
      parallax: -60,
      orbit: 7,
      orbitDur: 3.1,
      rotate: 10,
      children: (
        /* eslint-disable @next/next/no-img-element */
        <img
          src="/images/svg-3.svg"
          alt=""
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "left-[3%] bottom-[16%] w-6 sm:left-[6%] sm:w-7",
      speed: "fast",
      parallax: -60,
      orbit: 9,
      orbitDur: 3.4,
      rotate: 8,
      children: (
        <NextImage
          src="/images/reddbg.png"
          alt=""
          width={56}
          height={301}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[3%] bottom-[20%] w-10 sm:right-[7%] sm:w-12",
      speed: "slow",
      parallax: -40,
      orbit: 7,
      orbitDur: 5.8,
      rotate: -8,
      children: (
        <NextImage
          src="/images/yellow-bg-sq.png"
          alt=""
          width={133}
          height={134}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "left-[4%] top-[50%] w-16 sm:left-[2%] sm:w-18",
      speed: "slow",
      parallax: -40,
      orbit: 8,
      orbitDur: 6.6,
      rotate: 6,
      children: (
        <NextImage
          src="/images/jacks_fries_cutout.png"
          alt=""
          width={1920}
          height={1280}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[4%] top-[46%] w-8 sm:right-[3%] sm:w-10",
      speed: "fast",
      parallax: -60,
      orbit: 9,
      orbitDur: 3.3,
      rotate: -10,
      children: (
        /* eslint-disable @next/next/no-img-element */
        <img
          src="/images/svg-4.svg"
          alt=""
          className="h-auto w-full object-contain"
        />
      ),
    },
  ];

  // Entrance timeline — same language as the hero, triggered on scroll in
  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#boxes-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(
          "#boxes-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.25
        )
        .from("#boxes-rope", { opacity: 0, y: 10, duration: 0.6 }, 0.6)
        .from("#boxes-sub", { y: 18, opacity: 0, duration: 0.7 }, 0.75)
        .from(
          ".boxes-item",
          { y: 44, opacity: 0, duration: 0.9, stagger: 0.14 },
          0.5
        )
        .from(
          ".boxes-scatter",
          { opacity: 0, scale: 0.6, duration: 0.7, stagger: 0.05 },
          0.7
        )
        .from("#boxes-cta", { y: 16, opacity: 0, duration: 0.6 }, 0.9);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="menu"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      {/* Soft red glow — same as the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/40 blur-3xl"
      />

      {/* Scatters — behind the boxes, each with scroll parallax + idle orbit */}
      {scatters.map((s, i) => (
        <Scatter
          key={i}
          {...s}
          progress={scrollYProgress}
          wrapperCls="boxes-scatter"
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            id="boxes-eyebrow"
            className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Flame-Grilled
          </p>

          <h2
            id="boxes-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Three Bestsellers.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">Zero Filler.</em>
              </span>
            </span>
          </h2>

          {/* Flame medallion + provenance line */}
          <div
            id="boxes-rope"
            className="mt-5 flex items-center justify-center gap-2.5"
          >
            <span className="relative flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue/40">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/images/svg-2.svg"
                alt=""
                className="size-4 object-contain"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-navy-800/60 uppercase">
              British Beef · Baked Fresh · No Fillers
            </span>
          </div>

          <p
            id="boxes-sub"
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-navy-800/60 sm:text-lg"
          >
            100% British beef, flame-grilled to order and stacked into toasted
            brioche — no fillers, no shortcuts.
          </p>
        </div>

        {/* The three big boxes — floating, never synced */}
        <div
          ref={boxesRef}
          className="mt-10 flex flex-col items-center gap-14 md:flex-row md:items-end md:justify-center md:gap-8 lg:gap-16"
        >
          {boxes.map((box) => (
            <div
              key={box.name}
              className={box.champion ? "boxes-item md:mb-5" : "boxes-item"}
            >
              <motion.div
                className="flex flex-col items-center will-change-transform"
                animate={
                  reduceMotion || !boxesInView
                    ? undefined
                    : { y: [0, -12, 0] }
                }
                transition={{
                  repeat: Infinity,
                  duration: box.dur,
                  ease: "easeInOut",
                }}
              >
                <div className={`relative ${box.wCls}`}>
                  <NextImage
                    src={box.src}
                    alt={box.alt}
                    width={box.imgW}
                    height={box.imgH}
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 280px, 320px"
                    className="relative h-auto w-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="mt-8 text-center">
                  {box.champion && (
                    <p className="mb-1 font-mono text-[9px] tracking-[0.26em] text-gold uppercase">
                      ✦ Bestseller · 1,000+ Sold
                    </p>
                  )}
                  <h3 className="font-serif text-xl font-semibold text-navy-800 sm:text-2xl">
                    {box.name}
                  </h3>
                  <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-navy-800/60">
                    {box.desc}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-red px-4 py-1 font-mono text-sm font-medium text-white shadow-md shadow-red/25">
                    {box.price}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA — same red order button as the hero */}
        <div id="boxes-cta" className="mt-16 flex justify-center">
          <Button className="h-12 rounded-full bg-red px-9 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
            <Phone className="size-4" />
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
}
