"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import NextImage from "next/image";
import {
  Sun,
  Anchor,
  Sparkles,
  Clock,
  MapPin,
  Waves,
  Ship,
  Phone,
  ArrowRight,
  CheckCircle2,
  X,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  x: number; // percentage
  y: number; // percentage
  icon: typeof Sun;
  tag: string;
  highlight: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "solar",
    title: "Solar-Powered Galley",
    subtitle: "Eco-Engineered by Mairéad",
    desc: "Ireland's first solar-powered pier trailer. Clean energy fuels our custom deep fryers, minimising our footprint on Killybegs Harbour.",
    x: 32,
    y: 36,
    icon: Sun,
    tag: "Clean Energy",
    highlight: "100% Solar Driven",
  },
  {
    id: "catch",
    title: "Boat-to-Fryer Window",
    subtitle: "Landed at 06:00 · Fried at 12:30",
    desc: "Trawlers dock just 40 metres away at dawn. Fish is hand-filleted and dipped into Garry's ultra-crisp craft beer batter the moment you order.",
    x: 62,
    y: 52,
    icon: Anchor,
    tag: "Fresh Provenance",
    highlight: "0 KM Harbour Catch",
  },
  {
    id: "chalkboard",
    title: "Daily Chalkboard",
    subtitle: "Handwritten Specials",
    desc: "Menu changes with the morning tide. Fresh crab claws, scampi prawns, and our double All-Ireland award-winning seafood chowder.",
    x: 80,
    y: 40,
    icon: Sparkles,
    tag: "Daily Rotation",
    highlight: "Chowder Champion",
  },
  {
    id: "seating",
    title: "The Sunny Pier Wall",
    subtitle: "Where Donegal Eats",
    desc: "No reservations needed. Grab your steaming cardboard box, pop open a wooden fork, and sit on the harbour wall watching the trawlers.",
    x: 18,
    y: 68,
    icon: Waves,
    tag: "Harbour Vibe",
    highlight: "Panoramic Atlantic View",
  },
];

const DOCK_TELEMETRY = [
  { label: "Harbour Status", val: "Trawlers Landed", icon: Ship, status: "active" },
  { label: "Today's Service", val: "12:30 – 19:30", icon: Clock, status: "active" },
  { label: "Location", val: "Shore Road, Old Pier", icon: MapPin, status: "live" },
  { label: "Water Temp", val: "11.8°C Atlantic", icon: Waves, status: "live" },
];

export default function OpeningSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[1]);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Entrance reveals
  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });

      tl.from("#opening-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#opening-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from("#opening-sub", { y: 18, opacity: 0, duration: 0.7 }, 0.4)
        .from("#opening-telemetry", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.5)
        .from("#opening-stage", { scale: 0.96, opacity: 0, duration: 1, ease: "power2.out" }, 0.4)
        .from(".hotspot-pin", { scale: 0, opacity: 0, stagger: 0.12, ease: "back.out(1.8)", duration: 0.7 }, 0.8);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="opening"
      ref={rootRef}
      className="grain relative overflow-hidden bg-navy-950 py-24 text-cream lg:py-36"
    >
      {/* Background Ambient Harbour Glows */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: glowY }}
        className="pointer-events-none absolute top-1/4 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-red/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Top Header & Chapter Badge */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div id="opening-eyebrow" className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-gold animate-ping" />
              <p className="font-mono text-[11px] tracking-[0.32em] text-cream/70 uppercase">
                01.5 — The 12:30 Service Ritual
              </p>
            </div>

            <h2
              id="opening-title"
              className="mt-6 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
            >
              <span className="block overflow-hidden pb-1">
                <span className="line-inner block">When the harbour shutter</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="line-inner block">
                  rolls up at <em className="text-blue italic">12:30.</em>
                </span>
              </span>
            </h2>

            <p id="opening-sub" className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
              The queue starts before we unlock. Solar-powered fryers heat up, the morning trawler catch
              is hand-battered, and the Old Pier fills with the aroma of golden sea salt chips.
            </p>
          </div>

          {/* Quick CTA Pill */}
          <div className="flex shrink-0 items-center gap-4">
            <a
              href="tel:+353892393094"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-xl shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-2xl hover:shadow-red/35"
            >
              <Phone className="size-4" />
              Call Ahead: 089 239 3094
            </a>
          </div>
        </div>

        {/* Harbour Dock Telemetry Strip */}
        <div
          id="opening-telemetry"
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4"
        >
          {DOCK_TELEMETRY.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3.5 rounded-2xl border border-cream/10 bg-navy-900/60 p-3.5 backdrop-blur-md transition-colors hover:border-gold/30"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-800/80 text-gold shadow-inner">
                <item.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[9px] tracking-[0.22em] text-cream/45 uppercase">
                  {item.label}
                </p>
                <p className="truncate font-sans text-xs sm:text-sm font-semibold text-cream">
                  {item.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Interactive Stage: Interactive Shack Explorer */}
        <div id="opening-stage" className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left / Center (8 Cols): Photo Canvas with Glowing Hotspots */}
          <div className="relative lg:col-span-8">
            <motion.div
              style={reduceMotion ? undefined : { y: imageY }}
              className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-cream/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            >
              {/* Background Trailer Image */}
              <NextImage
                src="/images/open_shack_16x9.webp"
                alt="The Killybegs Seafood Shack solar trailer in action on Old Pier"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrims */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30"
              />

              {/* Live Explorer Watermark */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-cream/20 bg-navy-950/80 px-3.5 py-1.5 backdrop-blur-md">
                <span className="size-2 rounded-full bg-gold animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.24em] text-cream/80 uppercase">
                  Interactive Pier Map · Click Pins
                </span>
              </div>

              {/* Interactive Hotspot Pins */}
              {HOTSPOTS.map((spot) => {
                const isActive = activeHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    aria-label={`Explore ${spot.title}`}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className="hotspot-pin group/pin absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-300 focus:outline-none"
                  >
                    <span className="relative flex size-10 items-center justify-center">
                      {/* Pulsing ring */}
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 transition-all ${
                          isActive
                            ? "scale-125 bg-gold animate-ping"
                            : "bg-blue/60 group-hover/pin:scale-110"
                        }`}
                      />
                      {/* Core pin */}
                      <span
                        className={`relative flex size-8 items-center justify-center rounded-full border shadow-lg transition-all duration-300 ${
                          isActive
                            ? "border-gold bg-gold text-navy-950 scale-110 shadow-gold/50"
                            : "border-white/40 bg-navy-950/90 text-cream group-hover/pin:scale-105 group-hover/pin:border-gold"
                        }`}
                      >
                        <spot.icon className="size-4" />
                      </span>
                    </span>

                    {/* Tooltip Label on Hover */}
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-950/90 px-2.5 py-1 font-mono text-[9px] tracking-wider text-gold opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover/pin:opacity-100">
                      {spot.title}
                    </span>
                  </button>
                );
              })}

              {/* Bottom bar summary */}
              <div className="absolute right-4 bottom-4 left-4 z-10 hidden sm:flex items-center justify-between rounded-2xl border border-cream/10 bg-navy-950/70 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-gold/50 text-gold font-mono text-[9px] uppercase tracking-wider">
                    {activeHotspot?.tag || "Old Pier Spotlight"}
                  </Badge>
                  <p className="font-serif text-sm italic text-cream">
                    {activeHotspot?.highlight}
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-cream/50 uppercase">
                  Shore Road · Killybegs
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right (4 Cols): Selected Hotspot Details Glass Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative flex flex-col justify-between rounded-3xl border border-cream/15 bg-gradient-to-b from-navy-900/90 to-navy-950/95 p-7 shadow-[0_24px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                >
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-gold uppercase">
                        <activeHotspot.icon className="size-3" />
                        {activeHotspot.tag}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">
                        Feature 0{HOTSPOTS.findIndex((h) => h.id === activeHotspot.id) + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 font-serif text-2xl sm:text-3xl font-semibold text-cream italic">
                      {activeHotspot.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.26em] text-blue uppercase">
                      {activeHotspot.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-cream/75">
                      {activeHotspot.desc}
                    </p>

                    {/* Key Highlights Checkmarks */}
                    <div className="mt-6 space-y-2.5 border-t border-cream/10 pt-5">
                      <div className="flex items-center gap-2.5 text-xs text-cream/85">
                        <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                        <span>Operated by Chef Garry & Mairéad Anderson</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-cream/85">
                        <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                        <span>Fresh Atlantic wild catch prepared to order</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation between Hotspots */}
                  <div className="mt-8 flex items-center justify-between border-t border-cream/10 pt-5">
                    <div className="flex gap-1.5">
                      {HOTSPOTS.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => setActiveHotspot(h)}
                          aria-label={`Select ${h.title}`}
                          className={`size-2 rounded-full transition-all ${
                            activeHotspot.id === h.id ? "w-6 bg-gold" : "bg-cream/25 hover:bg-cream/60"
                          }`}
                        />
                      ))}
                    </div>

                    <a
                      href="#menu"
                      className="group inline-flex items-center gap-1.5 font-serif text-sm text-gold italic transition-colors hover:text-white"
                    >
                      See Menu Boxes
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
