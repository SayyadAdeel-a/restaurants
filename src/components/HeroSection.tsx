"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
};

/** One floating dish asset: wrapper (GSAP entrance) → parallax layer → bobbing image. */
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
}: FloatProps) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, moveY]);
  const rotate = useTransform(progress, [0, 1], [0, rotateTo]);

  return (
    <div aria-hidden className={`hero-float pointer-events-none absolute z-10 ${className}`}>
      <motion.div style={reduceMotion ? undefined : { y, rotate }}>
        <motion.img
          src={src}
          alt={alt}
          className={shadow ? "w-full drop-shadow-[0_22px_28px_rgba(27,29,58,0.18)]" : "w-full"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, -bob, 0] }
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
        />
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // One shared scroll progress for the dish + all floats (different rates = depth)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const dishY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const dishScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

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
        .from("#hero-dish-inner", { scale: 0.92, opacity: 0, duration: 1.1, ease: "power2.out" }, 0.45)
        .from(".hero-float", { opacity: 0, y: 26, duration: 0.8, stagger: 0.09 }, 0.6);
    },
    { scope: rootRef }
  );

  const floats: FloatProps[] = [
    // Left column
    {
      src: "/images/dish/killybegs_calamari_cutout_float.png",
      alt: "Crispy calamari",
      className: "left-[3%] top-[15%] w-24 -rotate-10 sm:left-[6%] sm:w-28 lg:w-32",
      progress: scrollYProgress,
      moveY: -75,
      rotateTo: -4,
      bob: 12,
      bobDur: 5.2,
    },
    {
      src: "/images/dish/killybegs_lemon_clean.png",
      alt: "Lemon wedge",
      className: "left-[7%] top-[47%] w-16 -rotate-16 sm:left-[11%] sm:w-20",
      progress: scrollYProgress,
      moveY: -40,
      rotateTo: -3,
      bob: 9,
      bobDur: 4.4,
    },
    {
      src: "/images/dish/killybegs_mussels_cutout_float.png",
      alt: "Fresh mussels",
      className: "left-[4%] bottom-[11%] w-24 rotate-8 sm:left-[7%] sm:w-28",
      progress: scrollYProgress,
      moveY: -95,
      rotateTo: 5,
      bob: 13,
      bobDur: 6.1,
    },
    // Right column
    {
      src: "/images/dish/killybegs_sodabread_cutout_float.png",
      alt: "Irish soda bread",
      className: "right-[3%] top-[14%] w-24 rotate-6 sm:right-[6%] sm:w-28 lg:w-32",
      progress: scrollYProgress,
      moveY: -55,
      rotateTo: 4,
      bob: 10,
      bobDur: 5.6,
    },
    {
      src: "/images/dish/killybegs_herbs_clean.png",
      alt: "Fresh herbs",
      className: "right-[6%] top-[46%] w-20 -rotate-6 sm:right-[11%] sm:w-24",
      progress: scrollYProgress,
      moveY: -35,
      rotateTo: 3,
      bob: 8,
      bobDur: 4.7,
    },
    {
      src: "/images/dish/killybegs_crab_cutout_float.png",
      alt: "Crab claws",
      className: "right-[4%] bottom-[10%] w-24 -rotate-8 sm:right-[7%] sm:w-28",
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
      {/* One soft glow behind the dish — nothing else */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[42%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      {/* Floating dish assets framing the copy */}
      {floats.map((f) => (
        <FloatingAsset key={f.src} {...f} />
      ))}

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Eyebrow */}
        <p
          id="hero-eyebrow"
          className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
        >
          Killybegs · Old Pier, Donegal
        </p>

        {/* Title */}
        <h1
          id="hero-title"
          className="mt-6 font-serif text-[clamp(2.9rem,7vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-navy-800"
        >
          <span className="block overflow-hidden pb-1">
            <span className="line-inner block">Fresh from the</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="line-inner block">
              <em className="text-blue italic">Boats</em> to Your Plate
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p
          id="hero-sub"
          className="mt-6 max-w-md text-base leading-relaxed text-navy-800/60 sm:text-lg"
        >
          Award-winning chowder and pier-fresh fish &amp; chips, crafted daily by
          Chef Garry Anderson.
        </p>

        {/* CTA */}
        <div id="hero-cta" className="mt-9">
          <Button className="h-12 rounded-full bg-red px-9 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
            <Phone className="size-4" />
            Order Takeaway
          </Button>
        </div>

        {/* Dish */}
        <motion.div
          id="hero-dish"
          className="relative mt-14 w-[min(72vw,380px)]"
          style={reduceMotion ? undefined : { y: dishY, scale: dishScale }}
        >
          {/* Soft contact shadow */}
          <div
            aria-hidden
            className="absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-navy-900/10 blur-2xl"
          />
          <div id="hero-dish-inner" className="relative aspect-square">
            <NextImage
              src="/images/dish/killybegs_chowder_bowl.png"
              alt="Killybegs award-winning seafood chowder"
              fill
              priority
              sizes="(max-width: 1024px) 72vw, 380px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(27,29,58,0.18)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
