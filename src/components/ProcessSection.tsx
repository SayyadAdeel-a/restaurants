"use client";

import { useEffect, useRef } from "react";
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
import { Ship, Sun, PackageCheck, Waves } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    time: "06:00",
    icon: Ship,
    title: "Landed at Old Pier",
    desc: "The trawlers dock at first light — our catch comes ashore on Ireland's premier fishing harbour.",
    img: null,
    tag: "The Catch",
  },
  {
    time: "12:30",
    icon: Sun,
    title: "Crafted in the Solar Trailer",
    desc: "Battered to order in Mairéad's solar-powered trailer — the queue starts before we even open.",
    img: "/images/missing_shack.webp",
    tag: "The Craft",
  },
  {
    time: "Minutes",
    icon: PackageCheck,
    title: "To Your Plate",
    desc: "Cardboard box, wooden forks, still steaming. Boat to fryer to you — in minutes.",
    img: null,
    tag: "The Finish",
  },
];

export default function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scrub progress across the section — drives line draw + particle wipe + floats
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Floating catch moving along the line as you scroll.
  // Function-form useTransform reads the live track width every frame.
  const trackW = () => trackRef.current?.offsetWidth ?? 0;
  const codTravel = useTransform(scrollYProgress, (v) =>
    Math.min(v, 0.95) / 0.95 * trackW()
  );
  const musselsTravel = useTransform(scrollYProgress, (v) =>
    Math.max(0, v - 0.05) / 0.95 * trackW()
  );
  const codY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const musselsY = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Steakhouse-style particle wipe — scrubbed by scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * 2);
    let h = (canvas.height = canvas.offsetHeight * 2);
    const parts = Array.from({ length: 110 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.4,
      base: Math.random() * w,
      speed: Math.random() * 0.9 + 0.3,
      o: Math.random() * 0.5 + 0.15,
    }));

    let raf = 0;
    const draw = () => {
      const c = scrollYProgress.get();
      ctx.clearRect(0, 0, w, h);

      // Ambient drift
      parts.forEach((p) => {
        p.x += Math.sin(Date.now() * 0.0006 + p.base) * 0.15;
        p.y -= 0.05;
        if (p.y < -10) p.y = h + 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,243,236,${p.o * 0.5})`;
        ctx.fill();
      });

      // Wipe surge — particles expand + rise as progress crosses each step
      if (c > 0.01) {
        parts.forEach((p, i) => {
          const surge = c * 26;
          const S = p.r + surge * (0.5 + ((i % 7) / 7)) + Math.sin(Date.now() * 0.001 + p.base) * 2;
          const d = Math.min(1, c * 0.9);
          const stepOffset = Math.floor(c * 3) / 3; // which step we're passing
          const x = p.x + Math.sin(c * 5 + p.base) * 10 + stepOffset * 0;
          ctx.beginPath();
          ctx.arc(x, p.y + c * -22, S, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250,247,240,${d * 0.85})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x * 0.98, p.y * 1.02 + c * -22, S * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${d * 0.5})`;
          ctx.fill();
        });
      }

      // Bottom cream wash — the "wipe" itself
      if (c > 0.72) {
        const wip = (c - 0.72) / 0.28;
        ctx.fillStyle = `rgba(245,243,236,${wip * 0.22})`;
        ctx.fillRect(0, h * (1 - wip * 1.25), w, h * wip * 1.25);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * 2;
      h = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion, scrollYProgress]);

  // Entrance reveals
  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#process-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#process-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from(".process-step", { y: 30, opacity: 0, duration: 0.7, stagger: 0.15 }, 0.5);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="process"
      ref={rootRef}
      className="grain relative overflow-hidden bg-navy-950 py-24 lg:py-36"
    >
      {/* Particle wipe canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="max-w-2xl">
          <p
            id="process-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-cream/60 uppercase"
          >
            <Waves className="size-3.5 text-blue" />
            02 — Boat to Fryer
          </p>
          <h2
            id="process-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">From the trawler</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                to your <em className="text-blue italic">plate.</em>
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/60 sm:text-lg">
            Pier-fresh means exactly that. Here&rsquo;s the journey, in hours
            not days.
          </p>
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-20">
          {/* Horizontal line + scroll-drawn fill */}
          <div
            aria-hidden
            className="absolute top-[52px] right-[4%] left-[4%] hidden h-px bg-cream/15 md:block"
          >
            <motion.div
              className="h-full origin-left bg-gold/70"
              style={reduceMotion ? undefined : { scaleX: lineScale }}
            />
          </div>

          {/* Floating catch along the line */}
          {/* Floating catch along the line — px travel across the track */}
          <motion.div
            aria-hidden
            style={reduceMotion ? undefined : { x: codTravel, y: codY }}
            className="pointer-events-none absolute top-6 left-0 z-20 hidden w-16 md:block"
          >
            <NextImage
              src="/images/dish/final2_cod.png"
              alt=""
              width={192}
              height={128}
              className="w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
          <motion.div
            aria-hidden
            style={reduceMotion ? undefined : { x: musselsTravel, y: musselsY }}
            className="pointer-events-none absolute top-[76px] left-0 z-20 hidden w-14 md:block"
          >
            <NextImage
              src="/images/dish/final2_mussels.png"
              alt=""
              width={192}
              height={128}
              className="w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="process-step relative flex flex-col md:items-center md:text-center"
              >
                {/* Node */}
                <div className="relative z-10 flex size-[104px] items-center justify-center">
                  <span className="flex size-24 items-center justify-center rounded-full border border-cream/15 bg-navy-900/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur">
                    {step.img ? (
                      <span className="relative block size-16 overflow-hidden rounded-full">
                        <NextImage
                          src={step.img}
                          alt={`${step.title} — the solar trailer`}
                          width={192}
                          height={192}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <step.icon className="size-7 text-blue" strokeWidth={1.5} />
                    )}
                  </span>
                </div>

                {/* Time */}
                <p className="mt-5 font-mono text-xs tracking-[0.3em] text-gold/90 uppercase">
                  {step.time}
                </p>

                {/* Title + desc */}
                <h3 className="mt-2 font-serif text-2xl font-semibold text-cream italic">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/55">
                  {step.desc}
                </p>

                {/* Tag */}
                <span className="mt-4 font-mono text-[9px] tracking-[0.28em] text-cream/35 uppercase">
                  {String(i + 1).padStart(2, "0")} · {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
