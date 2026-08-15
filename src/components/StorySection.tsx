"use client";

import { useRef, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { ArrowRight, Sun, Anchor } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StorySection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll parallax: photo drifts up, mayo drifts down (slower = depth)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const mayoY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Mouse-move tilt (±3deg) on the photo
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  // Entrance — masked line reveals on scroll into view
  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });
      tl.from("#story-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#story-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from("#story-copy p", { y: 18, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.55)
        .from("#story-cta", { y: 16, opacity: 0, duration: 0.6 }, 0.85);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="heritage"
      ref={rootRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      {/* Quiet blueprint ring behind the photo — heritage, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-navy-800/8"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-navy-800/5"
      />

      {/* Floating garlic mayo — 10% opacity, slow drift, bottom-right */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: mayoY }}
        className="pointer-events-none absolute right-[-4%] bottom-[-2%] z-0 w-[340px] opacity-10 sm:w-[420px] lg:w-[520px]"
      >
        <motion.img
          src="/images/dish/exact_garlic_mayo.png"
          alt=""
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -14, 0], rotate: [0, 2, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : { repeat: Infinity, duration: 9, ease: "easeInOut" }
          }
          className="w-full"
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        {/* Photo — Garry & Mairéad's trailer on Old Pier */}
        <motion.div
          style={reduceMotion ? undefined : { y: photoY }}
          className="relative"
        >
          <motion.div
            style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
            className="relative mx-auto max-w-xl [transform-style:preserve-3d]"
          >
            <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-[0_30px_60px_-15px_rgba(27,29,58,0.25)]">
              <NextImage
                src="/images/missing_shack.webp"
                alt="Garry & Mairéad's solar-powered seafood trailer on Old Pier, Shore Road, Killybegs"
                width={1920}
                height={1080}
                priority={false}
                sizes="(max-width: 1024px) 90vw, 560px"
                className="aspect-video w-full object-cover"
              />
            </div>

            {/* Caption card */}
            <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-12px_rgba(27,29,58,0.25)] backdrop-blur sm:left-8">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy-800/5">
                <Sun className="size-4 text-kraft-dark" />
              </span>
              <span className="leading-tight">
                <span className="block font-mono text-[10px] tracking-[0.22em] text-navy-800/50 uppercase">
                  Solar-powered · Est. 2017
                </span>
                <span className="block font-serif text-sm text-navy-800 italic">
                  Old Pier, Shore Road, Killybegs
                </span>
              </span>
            </div>

            {/* Est. badge on the photo */}
            <Badge className="absolute top-4 right-4 border border-navy-800/10 bg-cream/90 font-mono text-[10px] tracking-[0.22em] text-navy-800 uppercase shadow-sm backdrop-blur">
              Est. 2017
            </Badge>
          </motion.div>
        </motion.div>

        {/* Copy — about the trailer, not just the chefs */}
        <motion.div style={reduceMotion ? undefined : { y: copyY }}>
          <p
            id="story-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            <Anchor className="size-3.5 text-blue" />
            03 — Our Story
          </p>

          <h2
            id="story-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">From a trailer</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                to the <em className="text-blue italic">harbour&rsquo;s</em> best.
              </span>
            </span>
          </h2>

          <div id="story-copy" className="mt-8 max-w-lg space-y-5 text-base leading-relaxed text-navy-800/70 sm:text-lg">
            <p>
              Mairéad&apos;s <em className="font-serif text-navy-800 italic">solar-powered, flower-bedecked</em>{" "}
              trailer on Old Pier, Shore Road — Killybegs&apos; own boat-to-fryer
              kitchen on Ireland&apos;s premier fishing harbour.
            </p>
            <p>
              Chef Garry brings forty years of craft — ex Head Chef at
              5-star Lough Eske Castle, trained under Gordon Ramsay at
              Claridge&apos;s, London. Same pedigree, no pretension.
            </p>
          </div>

          <div id="story-cta" className="mt-10">
            <a
              href="https://dishcult.com/restaurant/andersonsboathouse"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-navy-800/20 px-7 text-sm font-semibold text-navy-800 transition-all duration-300 hover:border-navy-800 hover:bg-navy-800 hover:text-cream"
            >
              Visit Anderson&rsquo;s Boathouse on Main St
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
