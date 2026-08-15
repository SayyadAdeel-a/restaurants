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
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Star,
  Utensils,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Faint harbour silhouette — boats + waterline, drawn in SVG, low opacity. */
function HarbourBoats() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] w-full opacity-[0.05]"
    >
      {/* Waterline */}
      <path
        d="M0 300 Q 120 290 240 300 T 480 300 T 720 300 T 960 300 T 1200 300 T 1440 300 V 420 H 0 Z"
        fill="none"
        stroke="#35376B"
        strokeWidth="2"
      />
      {/* Trawler 1 */}
      <g fill="#35376B">
        <path d="M180 260 h110 v22 h-110 z" />
        <path d="M196 246 h66 v14 h-66 z" />
        <path d="M218 224 h8 v30 h-8 z" />
        <path d="M172 282 h126 l-14 14 h-98 z" />
        <path d="M290 268 l24 12 h-18 l-6 -12 z" />
      </g>
      {/* Trawler 2 */}
      <g fill="#35376B">
        <path d="M980 240 h96 v20 h-96 z" />
        <path d="M992 228 h58 v12 h-58 z" />
        <path d="M1012 210 h7 v26 h-7 z" />
        <path d="M974 260 h108 l-12 12 h-84 z" />
        <path d="M1078 248 l20 10 h-16 l-4 -10 z" />
      </g>
      {/* Small boat */}
      <g fill="#35376B">
        <path d="M620 272 h64 l-8 9 h-48 z" />
        <path d="M642 258 h7 v16 h-7 z" />
      </g>
      {/* Seagull ticks */}
      <g stroke="#35376B" strokeWidth="2" fill="none">
        <path d="M420 210 q6 -8 12 0 q6 -8 12 0" />
        <path d="M880 190 q5 -7 10 0 q5 -7 10 0" />
        <path d="M1150 214 q4 -6 8 0 q4 -6 8 0" />
      </g>
    </svg>
  );
}

const infoRows = [
  {
    icon: Phone,
    label: "Call ahead",
    value: "+353 89 239 3094",
    href: "tel:+353892393094",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "12:30 – 19:30 · 20:30 in summer",
  },
  {
    icon: Utensils,
    label: "Good to know",
    value: "No booking · Takeaway · Cards accepted · Wheelchair accessible",
  },
];

const seating = ["Sunny Wall", "Patio Behind the Shack", "Harbour Bar Shelter"];

export default function FindUsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const mayoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#findus-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#findus-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from("#findus-map", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" }, 0.4)
        .from("#findus-info > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.6);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      <HarbourBoats />

      {/* Floating garlic mayo — 10% opacity, bottom-left */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: mayoY }}
        className="pointer-events-none absolute bottom-[-3%] left-[-4%] z-0 w-72 opacity-10 sm:w-96"
      >
        <motion.img
          src="/images/dish/bento_garlic_mayo.webp"
          alt=""
          animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
          className="w-full"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="max-w-2xl">
          <p
            id="findus-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            <MapPin className="size-3.5 text-blue" />
            05 — Find Us on the Pier
          </p>
          <h2
            id="findus-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Follow the gulls</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                to the <em className="text-blue italic">Old Pier.</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-5">
          {/* Map */}
          <div
            id="findus-map"
            className="relative overflow-hidden rounded-3xl border border-navy-100 shadow-[0_30px_60px_-15px_rgba(27,29,58,0.25)] lg:col-span-3"
          >
            <iframe
              title="Map — Killybegs Seafood Shack, Shore Rd, Killybegs, Co. Donegal F94 WF5X"
              src="https://www.google.com/maps?q=Shore%20Rd%2C%20Killybegs%2C%20Co.%20Donegal%20F94%20WF5X%2C%20Ireland&z=16&output=embed"
              className="h-[340px] w-full border-0 sm:h-[420px] lg:h-full lg:min-h-[480px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Bobbing shack marker overlay */}
            <div className="pointer-events-none absolute top-[38%] left-1/2 z-10 -translate-x-1/2">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
                }
                className="relative flex flex-col items-center"
              >
                <span className="relative block size-16 overflow-hidden rounded-2xl border-2 border-white shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                  <NextImage
                    src="/images/missing_shack.webp"
                    alt="Killybegs Seafood Shack — Old Pier, Shore Road"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span
                  aria-hidden
                  className="mt-[-6px] h-6 w-px bg-navy-800/60"
                />
                <span
                  aria-hidden
                  className="size-3 rounded-full bg-red shadow-[0_0_0_5px_rgba(171,48,54,0.2)]"
                />
              </motion.div>
            </div>

            {/* Pin label chip */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur">
              <MapPin className="size-3.5 text-red" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-navy-800 uppercase">
                Shore Rd · Killybegs F94 WF5X
              </span>
            </div>
          </div>

          {/* Info */}
          <div
            id="findus-info"
            className="flex flex-col gap-6 rounded-3xl border border-navy-100 bg-white/70 p-8 shadow-[0_30px_60px_-15px_rgba(27,29,58,0.15)] backdrop-blur lg:col-span-2"
          >
            {infoRows.map((row) => (
              <div key={row.label}>
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.26em] text-navy-800/45 uppercase">
                  <row.icon className="size-3.5 text-blue" />
                  {row.label}
                </p>
                {row.href ? (
                  <a
                    href={row.href}
                    className="mt-1.5 inline-block font-serif text-2xl font-semibold text-navy-800 transition-colors hover:text-red"
                  >
                    {row.value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-base leading-relaxed font-medium text-navy-800/80">
                    {row.value}
                  </p>
                )}
              </div>
            ))}

            {/* Where to sit */}
            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.26em] text-navy-800/45 uppercase">
                <Utensils className="size-3.5 text-blue" />
                Where to eat it
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {seating.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-navy-800/15 bg-cream px-3 py-1.5 text-xs font-medium text-navy-800/75"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a
                href="https://maps.google.com/?cid=12648710332822452345"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-navy-800 px-6 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-lg"
              >
                <MapPin className="size-4" />
                Google Maps
                <ExternalLink className="size-3.5 opacity-60" />
              </a>
              <a
                href="https://www.tripadvisor.com/Restaurant_Review-g211874-d12519106-Reviews-Killybegs_Seafood_Shack-Killybegs_County_Donegal.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-navy-800/20 bg-white px-6 text-sm font-semibold text-navy-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-800 hover:bg-navy-800 hover:text-cream"
              >
                <Star className="size-4 text-gold" />
                TripAdvisor · 4.9
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
