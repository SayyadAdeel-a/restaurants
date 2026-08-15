"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import {
  Building2,
  BedDouble,
  Phone,
  Award,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Sunset harbour silhouette — the Boathouse sits on Main St with the view. */
function HarbourSunset() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2C55" />
          <stop offset="0.55" stopColor="#4A5090" />
          <stop offset="0.8" stopColor="#C98A6B" />
          <stop offset="1" stopColor="#AB3036" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#sunset)" />
      <circle cx="450" cy="180" r="34" fill="#F5D9A8" opacity="0.9" />
      {/* Water */}
      <rect y="215" width="600" height="105" fill="#1B1D3A" opacity="0.65" />
      <path
        d="M0 220 Q 60 216 120 220 T 240 220 T 360 220 T 480 220 T 600 220 V 232 H 0 Z"
        fill="#F5D9A8"
        opacity="0.12"
      />
      {/* Boathouse rooftop silhouette on the far shore */}
      <path
        d="M0 240 h90 l22 -26 h26 l22 26 h40 v34 h-200 z M60 240 v-12 h16 v12"
        fill="#0E1026"
        opacity="0.85"
      />
      {/* Trawler */}
      <g fill="#0E1026">
        <path d="M140 228 h84 v16 h-84 z" />
        <path d="M152 218 h52 v10 h-52 z" />
        <path d="M168 202 h7 v24 h-7 z" />
        <path d="M134 244 h96 l-11 10 h-74 z" />
      </g>
      {/* Masts */}
      <g stroke="#0E1026" strokeWidth="2.5">
        <line x1="300" y1="210" x2="300" y2="244" />
        <line x1="500" y1="214" x2="500" y2="244" />
      </g>
      <g stroke="#F5D9A8" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M262 186 q6 -8 12 0 q6 -8 12 0" />
        <path d="M540 172 q5 -7 10 0 q5 -7 10 0" />
      </g>
    </svg>
  );
}

/** Night harbour silhouette — apartments stay above the harbour lights. */
function HarbourNight() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A2342" />
          <stop offset="0.7" stopColor="#1B2A55" />
          <stop offset="1" stopColor="#2A2C55" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#night)" />
      {/* Moon */}
      <circle cx="120" cy="70" r="22" fill="#E8E6F2" opacity="0.9" />
      <circle cx="128" cy="64" r="20" fill="#0A2342" opacity="0.55" />
      {/* Stars */}
      {[
        [60, 40], [210, 52], [330, 36], [430, 62], [520, 44], [260, 90], [560, 84],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#F5F3EC" opacity="0.7" />
      ))}
      {/* Water */}
      <rect y="215" width="600" height="105" fill="#0A2342" opacity="0.8" />
      {/* Apartments — modern block above the harbour */}
      <g fill="#0E1026">
        <rect x="180" y="120" width="150" height="100" rx="2" opacity="0.9" />
        <rect x="368" y="150" width="110" height="70" rx="2" opacity="0.8" />
      </g>
      {/* Lit windows */}
      <g fill="#F5D9A8" opacity="0.85">
        {[
          [194, 136], [216, 136], [238, 136], [260, 136],
          [194, 162], [216, 162], [238, 162], [260, 162],
          [194, 188], [216, 188], [238, 188], [260, 188],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="12" height="14" rx="1.5" />
        ))}
        {[[382, 164], [404, 164], [426, 164], [382, 190], [404, 190], [426, 190]].map(
          ([x, y], i) => (
            <rect key={`b${i}`} x={x} y={y} width="11" height="13" rx="1.5" />
          )
        )}
      </g>
      {/* Water reflections */}
      <g fill="#F5D9A8" opacity="0.25">
        {[220, 240, 260, 280, 300].map((y, i) => (
          <rect key={i} x={215 + i * 4} y={y} width={70 - i * 8} height="2" />
        ))}
        {[225, 245, 265, 285].map((y, i) => (
          <rect key={`r${i}`} x={400 + i * 3} y={y} width={50 - i * 8} height="2" />
        ))}
      </g>
      <g stroke="#F5D9A8" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M500 96 q5 -7 10 0 q5 -7 10 0" />
      </g>
    </svg>
  );
}

const ventures = [
  {
    id: "boathouse",
    icon: Building2,
    cover: HarbourSunset,
    eyebrow: "Sister Restaurant",
    title: "Anderson's Boathouse",
    tagline: "Main St · harbour view",
    desc: "Our sit-down restaurant overlooking the working harbour — the same boat-to-fryer pedigree, with a menu to linger over.",
    rows: [
      { label: "Phone", value: "+353 74 973 1730", href: "tel:+353749731730" },
      { label: "Prices", value: "£8 – £25" },
    ],
    badge: "Certificate of Excellence",
    cta: "Book a Table",
    href: "https://dishcult.com/restaurant/andersonsboathouse",
  },
  {
    id: "apartments",
    icon: BedDouble,
    cover: HarbourNight,
    eyebrow: "Sister Stay",
    title: "Luxury Harbour Apartments",
    tagline: "Stay above the harbour",
    desc: "Boutique self-catering apartments in the heart of Killybegs — the perfect base for Slieve League and the Wild Atlantic Way.",
    rows: [
      { label: "Where", value: "Killybegs town centre" },
      { label: "Vibe", value: "Harbour-side, self-catering" },
    ],
    badge: "Slieve League Base",
    cta: "Enquire on Maps",
    href: "https://maps.google.com/?cid=12648710332822452345",
  },
];

export default function SisterVenturesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#ventures-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#ventures-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from(".venture-card", { y: 40, opacity: 0, duration: 0.9, stagger: 0.18 }, 0.5);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="ventures"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="max-w-2xl">
          <p
            id="ventures-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            <Building2 className="size-3.5 text-blue" />
            06 — The Anderson Group
          </p>
          <h2
            id="ventures-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">The family</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                behind the <em className="text-blue italic">shack.</em>
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-navy-800/60 sm:text-lg">
            Two more reasons to stay on the pier a little longer.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {ventures.map((v) => (
            <div key={v.id} className="venture-card">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_24px_50px_-18px_rgba(27,29,58,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(27,29,58,0.35)]">
              {/* Harbour cover */}
              <div className="relative h-56 overflow-hidden">
                <v.cover />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-navy-950/70 px-3 py-1.5 font-mono text-[9px] tracking-[0.22em] text-cream/85 uppercase backdrop-blur">
                  <v.icon className="size-3 text-blue" />
                  {v.eyebrow}
                </span>
                <span className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full border border-gold/50 bg-navy-950/70 px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-gold uppercase backdrop-blur">
                  <Award className="size-3" />
                  {v.badge}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-serif text-3xl font-semibold text-navy-800">
                  {v.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.26em] text-blue uppercase">
                  {v.tagline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-navy-800/65">
                  {v.desc}
                </p>

                <div className="mt-6 space-y-3 border-t border-navy-100 pt-6">
                  {v.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="font-mono text-[10px] tracking-[0.26em] text-navy-800/45 uppercase">
                        {row.label}
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="flex items-center gap-1.5 font-serif text-lg text-navy-800 transition-colors hover:text-red"
                        >
                          <Phone className="size-3.5 text-blue" />
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-right font-serif text-lg text-navy-800/80 italic">
                          {row.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <a
                  href={v.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy-800 px-7 text-sm font-semibold text-cream transition-all duration-300 group-hover:bg-red group-hover:shadow-lg group-hover:shadow-red/25"
                >
                  {v.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
