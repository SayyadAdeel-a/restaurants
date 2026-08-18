"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHONE = "01248 666800";
const PHONE_HREF = "tel:+441248666800";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Llangefni+Road+Brynteg+LL78+8JQ";
const EMAIL = "info@jacksburgeruk.com";
const EMAIL_HREF = "mailto:info@jacksburgeruk.com";

/* ---------- Section ---------- */

export default function FindUsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { margin: "200px 0px" });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-jacks py-24 lg:py-36"
    >
      {/* Soft red glow behind the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[26%] h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red-200/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — copy */}
        <div className="order-1 max-w-xl">
          <motion.p
            id="find-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase"
          >
            Jack&rsquo;s Burger UK · Find Us
          </motion.p>

          <h2
            id="find-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-ink"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Hot off the Grill.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">Come Hungry.</em>
              </motion.span>
            </span>
          </h2>

          {/* Maroon location blocks — the real Jack's Burger spots */}
          <motion.div
            id="find-address"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-8 overflow-hidden rounded-3xl bg-maroon text-cream shadow-[0_30px_70px_rgba(61,10,10,0.35)]"
          >
            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {/* Location */}
              <div className="bg-maroon p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-retro text-lg tracking-wide text-jacks uppercase">
                    Jack&rsquo;s Burger
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-jacks px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-ink uppercase">
                    <span className="size-1.5 rounded-full bg-red" />
                    Open Now
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">
                  Llangefni Road, Brynteg
                  <br />
                  LL78 8JQ · North Wales
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-jacks uppercase transition-colors hover:text-cream"
                >
                  <Navigation className="size-3.5" />
                  Get Directions
                </a>
              </div>

              {/* Hours */}
              <div className="bg-maroon p-6">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/60 uppercase">
                  <Clock className="size-3.5 text-jacks" />
                  Working Hours
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/90">
                  Sun – Thu · 11am – 11pm
                  <br />
                  Fri – Sat · 11am – Midnight
                </p>
              </div>

              {/* Phone */}
              <div className="bg-maroon p-6">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/60 uppercase">
                  <Phone className="size-3.5 text-jacks" />
                  Call Us
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-3 inline-block text-lg font-semibold text-cream transition-colors hover:text-jacks"
                >
                  {PHONE}
                </a>
                <p className="mt-1 text-xs text-cream/60">
                  Dine-in, takeaway &amp; delivery
                </p>
              </div>

              {/* Email */}
              <div className="bg-maroon p-6">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/60 uppercase">
                  <Mail className="size-3.5 text-jacks" />
                  Got a Question?
                </p>
                <a
                  href={EMAIL_HREF}
                  className="mt-3 inline-block text-sm font-semibold break-all text-cream transition-colors hover:text-jacks"
                >
                  {EMAIL}
                </a>
                <p className="mt-1 text-xs text-cream/60">
                  Or find us on Instagram{" "}
                  <a
                    href="https://instagram.com/jacksburgeruk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-jacks transition-colors hover:text-cream"
                  >
                    @jacksburgeruk
                  </a>
                </p>
              </div>
            </div>

            {/* Branches strip — the real Jack's Burger sites */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 bg-maroon px-6 py-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-cream/70 uppercase">
                Bangor · Penrhyn Bay · Abersoch
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-jacks uppercase">
                More sites across the UK — watch us grow 🍔
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            id="find-cta"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
            >
              <Phone className="size-4" />
              Order Now
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/20 px-7 text-sm font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-white"
            >
              <Navigation className="size-4 text-blue" />
              Get Directions
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right — the chicken burger as a floating plate */}
        <div className="order-2 mx-auto w-[min(82vw,480px)] lg:w-[min(42vw,560px)]">
          <motion.div style={reduceMotion ? undefined : { y: photoY }}>
            <motion.div
              initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
            <motion.div
              id="find-photo-inner"
              ref={photoRef}
              className="relative will-change-transform"
              animate={
                reduceMotion || !photoInView ? undefined : { y: [0, -12, 0] }
              }
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              {/* Floating plate — circular crop like a serving plate */}
              <div className="relative overflow-hidden rounded-full border-8 border-white shadow-[0_30px_80px_rgba(0,0,0,0.15)]">                  <NextImage
                    src="/images/jacks_scroll03_transparent_v2.png"
                    alt="The full Jack's spread — burgers, fries and rings"
                    width={1600}
                    height={914}
                    sizes="(max-width: 1024px) 82vw, 560px"
                    className="aspect-square h-auto w-full object-cover"
                  />
                {/* Faint dark scrim so the pin reads */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-navy-950/10"
                />
              </div>

              {/* Map pin — bobbing on the plate */}
              <motion.div
                className="absolute left-1/2 top-[18%] -translate-x-1/2"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              >
                <div className="relative">
                  <span className="block size-10 rounded-full bg-red shadow-lg shadow-red/30 ring-4 ring-white sm:size-12" />
                  <MapPin className="absolute inset-0 m-auto size-5 text-white sm:size-6" />
                </div>
              </motion.div>

              {/* You-are-here label */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-ink uppercase shadow-lg backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-red" />
                  Jack&rsquo;s · Brynteg
                </span>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
