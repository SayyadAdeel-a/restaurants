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
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  champion?: boolean;
};

const boxes: Box[] = [
  {
    src: "/images/dish/exact_sharing_box.png",
    alt: "The Sharing Box — smoked haddock, goujons, scampi and calamari",
    name: "The Sharing Box",
    desc: "Smoked haddock, goujons, scampi & calamari, skin-on fries",
    price: "€14",
    dur: 5,
    wCls: "w-52 sm:w-60 lg:w-64",
  },
  {
    src: "/images/dish/killybegs_chowder_bowl.png",
    alt: "Award-winning seafood chowder",
    name: "The Chowder",
    desc: "Smoked haddock, wild salmon & Donegal blue mussels",
    price: "€8.50",
    dur: 6,
    wCls: "w-56 sm:w-[16.5rem] lg:w-[17.6rem]", // 10% bigger — the award winner
    champion: true,
  },
  {
    src: "/images/dish/exact_cod_bites.png",
    alt: "Fish & Chips — hand-battered cod with triple-cooked chips",
    name: "Fish & Chips",
    desc: "Hand-battered cod, triple-cooked chips, mushy peas",
    price: "€9.50",
    dur: 7,
    wCls: "w-52 sm:w-60 lg:w-64",
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

/* Wooden fork — no asset exists, drawn inline to match the site's fork motif */
function WoodenFork() {
  return (
    <svg viewBox="0 0 24 64" className="h-full w-full" aria-hidden>
      <rect x="2" y="1" width="3.5" height="20" rx="1.75" fill="#d8c9a8" />
      <rect x="10.25" y="1" width="3.5" height="24" rx="1.75" fill="#d8c9a8" />
      <rect x="18.5" y="1" width="3.5" height="20" rx="1.75" fill="#d8c9a8" />
      <path d="M1 18h22v8c0 3-2 5-5 5H6c-3 0-5-2-5-5z" fill="#c2a878" />
      <rect x="7.5" y="30" width="9" height="30" rx="4.5" fill="#c2a878" />
      <rect x="7.5" y="30" width="3.5" height="30" rx="1.75" fill="#d8c9a8" />
    </svg>
  );
}

/* ---------- Component ---------- */

export default function BoxesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // One shared scroll progress → per-scatter parallax (fast = 1.5× slow)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const scatters: Scatter[] = [
    {
      posCls: "left-[5%] top-[22%] w-14 sm:left-[7%] sm:w-16",
      speed: "slow",
      parallax: -40,
      orbit: 8,
      orbitDur: 6.2,
      rotate: -12,
      children: (
        <NextImage
          src="/images/dish/killybegs_lemon_clean.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[6%] top-[18%] w-12 sm:right-[9%] sm:w-14",
      speed: "fast",
      parallax: -60,
      orbit: 7,
      orbitDur: 3.1,
      rotate: 10,
      children: (
        <NextImage
          src="/images/dish/killybegs_herbs_clean.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "left-[3%] bottom-[16%] w-16 sm:left-[6%] sm:w-20",
      speed: "fast",
      parallax: -60,
      orbit: 9,
      orbitDur: 3.4,
      rotate: 8,
      children: (
        <NextImage
          src="/images/dish/killybegs_mussels_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[3%] bottom-[20%] w-14 sm:right-[7%] sm:w-16",
      speed: "slow",
      parallax: -40,
      orbit: 7,
      orbitDur: 5.8,
      rotate: -8,
      children: (
        <NextImage
          src="/images/dish/killybegs_crab_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "left-[4%] top-[50%] w-16 sm:left-[2%] sm:w-20",
      speed: "slow",
      parallax: -40,
      orbit: 8,
      orbitDur: 6.6,
      rotate: 6,
      children: (
        <NextImage
          src="/images/dish/killybegs_sodabread_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[4%] top-[46%] w-16 sm:right-[3%] sm:w-18",
      speed: "fast",
      parallax: -60,
      orbit: 9,
      orbitDur: 3.3,
      rotate: -10,
      children: (
        <NextImage
          src="/images/dish/killybegs_calamari_cutout_float.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "left-[15%] bottom-[8%] w-12 sm:left-[20%] sm:w-14",
      speed: "slow",
      parallax: -40,
      orbit: 6,
      orbitDur: 5.4,
      rotate: 14,
      children: (
        <NextImage
          src="/images/dish/exact_garlic_mayo.png"
          alt=""
          width={600}
          height={400}
          className="h-auto w-full object-contain"
        />
      ),
    },
    {
      posCls: "right-[15%] bottom-[10%] w-10 sm:right-[20%] sm:w-12",
      speed: "fast",
      parallax: -60,
      orbit: 7,
      orbitDur: 3.6,
      rotate: -32,
      children: <WoodenFork />,
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
      {/* Soft blue glow — same as the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      {/* Scatters — behind the boxes, each with scroll parallax + idle orbit */}
      {scatters.map((s, i) => (
        <Scatter key={i} {...s} progress={scrollYProgress} />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            id="boxes-eyebrow"
            className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            Killybegs Harbour · Solar Powered
          </p>

          <h2
            id="boxes-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Seven Boxes.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">Zero Filler.</em>
              </span>
            </span>
          </h2>

          {/* Rope medallion + provenance line */}
          <div
            id="boxes-rope"
            className="mt-5 flex items-center justify-center gap-2.5"
          >
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
              Fresh · Local · Sustainable
            </span>
          </div>

          <p
            id="boxes-sub"
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-navy-800/60 sm:text-lg"
          >
            Pier-fresh, battered to order daily from our trailer on Old Pier,
            Donegal.
          </p>
        </div>

        {/* The three big boxes — floating, never synced */}
        <div className="mt-16 flex flex-col items-center gap-14 sm:flex-row sm:items-end sm:justify-center sm:gap-12 lg:gap-16">
          {boxes.map((box) => (
            <div key={box.name} className="boxes-item">
              <motion.div
                className="flex flex-col items-center"
                animate={
                  reduceMotion
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
                  {/* Huge soft shadow — same as the chowder bowl */}
                  <div
                    aria-hidden
                    className="absolute -bottom-8 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-navy-900/10 blur-2xl"
                  />
                  <NextImage
                    src={box.src}
                    alt={box.alt}
                    width={1920}
                    height={1280}
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 280px, 320px"
                    className="relative h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(27,29,58,0.18)]"
                  />
                </div>

                <div className="mt-8 text-center">
                  {box.champion && (
                    <p className="mb-1 font-mono text-[9px] tracking-[0.26em] text-gold uppercase">
                      ✦ 2× Champion · 2019 &amp; 2020
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
            Order Takeaway
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Scatter layer ---------- */

function Scatter({
  posCls,
  parallax,
  orbit,
  orbitDur,
  rotate,
  children,
  progress,
}: Scatter & { progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, parallax]);

  return (
    <div
      aria-hidden
      className={`boxes-scatter pointer-events-none absolute z-0 ${posCls}`}
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
