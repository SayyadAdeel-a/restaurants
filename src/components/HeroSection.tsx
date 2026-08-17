"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

type FloatProps = {
  src: string;
  alt: string;
  className: string; // absolute position + size + rotation
  progress: MotionValue<number>;
  moveY: number; // parallax drift over the scroll range
  rotateTo: number; // parallax rotation
  bob: number; // idle float amplitude (px)
  bobDur: number; // idle float duration (s)
  shadow?: boolean;
  svg?: boolean; // render as a plain <img> (next/image rejects SVGs)
  imgW?: number; // source width for NextImage aspect ratio (default 1920)
  imgH?: number; // source height for NextImage aspect ratio (default 1280)
};

/** One floating asset: wrapper (GSAP entrance) → parallax layer → bobbing image. */
function FloatingAsset({
  src,
  alt,
  className,
  progress,
  moveY,
  rotateTo,
  bob,
  bobDur,
  shadow = true,
  svg = false,
  imgW = 1920,
  imgH = 1280,
}: FloatProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const y = useTransform(progress, [0, 1], [0, moveY]);
  const rotate = useTransform(progress, [0, 1], [0, rotateTo]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`hero-float pointer-events-none absolute z-10 ${className}`}
    >
      <motion.div
        style={reduceMotion ? undefined : { y, rotate }}
        className="will-change-transform"
      >
        <motion.div
          className="will-change-transform"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1 }
              : inView
                ? { opacity: 1, scale: 1, y: [0, -bob, 0] }
                : { opacity: 1, scale: 1, y: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0.6 }
              : {
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  y: { repeat: Infinity, duration: bobDur, ease: "easeInOut" },
                }
          }
        >
          {svg ? (
            /* eslint-disable @next/next/no-img-element */
            <img
              src={src}
              alt={alt}
              className="h-auto w-full object-contain"
            />
          ) : (
            <NextImage
              src={src}
              alt={alt}
              width={imgW}
              height={imgH}
              sizes="192px"
              className={
                shadow
                  ? "h-auto w-full object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.18)]"
                  : "h-auto w-full object-contain"
              }
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* The two floating heroes — Smash by day, Chicken by night */
const duo = [
  {
    src: "/images/jacks_smash_burger_cutout.png",
    alt: "Jack's signature smash burger — double flame-grilled British beef",
    name: "Smash Burger",
    dur: 5,
    w: 1600,
    h: 1600,
    cls: "w-[min(56vw,300px)] md:w-[min(26vw,320px)]",
  },
  {
    src: "/images/jacks_chicken_burger_cutout.png",
    alt: "Jack's buttermilk chicken burger — fried chicken, slaw, hot honey mayo",
    name: "Chicken Burger",
    dur: 7,
    w: 1920,
    h: 1280,
    cls: "w-[min(64vw,320px)] md:w-[min(30vw,340px)]",
  },
];

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const duoRef = useRef<HTMLDivElement>(null);
  const duoInView = useInView(duoRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  // One shared scroll progress for the duo + all floats (different rates = depth)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const duoY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const duoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // GSAP — one smooth entrance timeline for the copy + floats
  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("#hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(
          "#hero-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.25
        )
        .from("#hero-sub", { y: 18, opacity: 0, duration: 0.7 }, 0.7)
        .from("#hero-cta", { y: 16, opacity: 0, duration: 0.6 }, 0.85)
        // LCP-safe: keep visible (no opacity gate), just a gentle scale-in
        .from(".hero-duo", { scale: 0.94, duration: 1.2, ease: "power2.out" }, 0.45)
        .from(".hero-float", { opacity: 0, y: 26, duration: 0.8, stagger: 0.09 }, 0.6);
    },
    { scope: rootRef }
  );

  const floats: FloatProps[] = [
    // Left column
    {
      src: "/images/jacks_asset_brioche.png",
      alt: "Fresh brioche bun",
      className: "left-[4%] top-[16%] w-12 -rotate-10 sm:left-[7%] sm:w-14",
      progress: scrollYProgress,
      moveY: -75,
      rotateTo: -4,
      bob: 12,
      bobDur: 5.2,
    },
    {
      src: "/images/burger_fries.png",
      alt: "Skin-on fries",
      className: "left-[4%] bottom-[11%] w-24 rotate-8 sm:left-[7%] sm:w-28",
      progress: scrollYProgress,
      moveY: -95,
      rotateTo: 5,
      bob: 13,
      bobDur: 6.1,
      imgW: 1600,
      imgH: 1600,
    },
    // Right column
    {
      src: "/images/burger_tomato.png",
      alt: "Fresh tomato",
      className: "right-[4%] top-[15%] w-12 rotate-6 sm:right-[7%] sm:w-14",
      progress: scrollYProgress,
      moveY: -55,
      rotateTo: 4,
      bob: 10,
      bobDur: 5.6,
    },
    {
      src: "/images/jacks_asset_pickle_lemon.png",
      alt: "Pickles and lemon",
      className: "right-[4%] bottom-[10%] w-12 -rotate-8 sm:right-[7%] sm:w-14",
      progress: scrollYProgress,
      moveY: -85,
      rotateTo: -5,
      bob: 12,
      bobDur: 5.9,
    },
  ];

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cream px-5 py-24 text-center sm:px-6"
    >
      {/* One soft glow behind the duo — nothing else */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[46%] left-1/2 h-[620px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/40 blur-3xl"
      />

      {/* Floating burger assets framing the copy */}
      {floats.map((f) => (
        <FloatingAsset key={f.src} {...f} />
      ))}

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Eyebrow */}
        <p
          id="hero-eyebrow"
          className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
        >
          Jack&rsquo;s Burger UK · Flame-Grilled British Beef
        </p>

        {/* Title */}
        <h1
          id="hero-title"
          className="mt-6 font-serif text-[clamp(2.9rem,7vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-navy-800"
        >
          <span className="block overflow-hidden pb-1">
            <span className="line-inner block">Great Burgers.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="line-inner block">
              <em className="text-blue italic">Made Right.</em>
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p
          id="hero-sub"
          className="mt-6 max-w-xl text-base leading-relaxed text-navy-800/60 sm:text-lg"
        >
          100% British beef, flame-grilled to order and stacked between toasted
          brioche — no fillers, no shortcuts, just proper burgers.
        </p>

        {/* CTA */}
        <div id="hero-cta" className="mt-9">
          <Button className="h-12 rounded-full bg-red px-9 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
            <Phone className="size-4" />
            Order Now
          </Button>
        </div>

        {/* The two floating heroes — Smash burger + Chicken burger */}
        <motion.div
          className="mt-16 w-full"
          style={reduceMotion ? undefined : { y: duoY, scale: duoScale }}
        >
          <div
            ref={duoRef}
            className="flex w-full flex-col items-center justify-center gap-12 md:flex-row md:items-end md:gap-20"
          >
            {duo.map((d) => (
              <div key={d.name} className={`hero-duo ${d.cls}`}>
                <motion.div
                  className="will-change-transform"
                  animate={
                    reduceMotion || !duoInView ? undefined : { y: [0, -12, 0] }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: d.dur,
                    ease: "easeInOut",
                  }}
                >
                  <NextImage
                    src={d.src}
                    alt={d.alt}
                    width={d.w}
                    height={d.h}
                    sizes="(max-width: 768px) 64vw, 340px"
                    className="relative h-auto w-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
