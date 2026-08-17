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
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import Scatter from "@/components/Scatter";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHONE = "+44 0000 000000";
const PHONE_HREF = "tel:+440000000000";
const MAPS_URL = "https://maps.google.com/";

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
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      {/* Soft red glow behind the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[26%] h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red-200/30 blur-3xl"
      />

      {/* Edge scatters — flames, ribbon & fries drifting down the page */}
      <Scatter
        posCls="left-[4%] top-[10%] w-12 sm:left-[6%] sm:w-14"
        parallax={-45}
        orbit={8}
        orbitDur={5.6}
        rotate={-12}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/burger_bacon.png"
          alt=""
          width={1920}
          height={1280}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[5%] top-[12%] w-12 sm:right-[8%] sm:w-14"
        parallax={-65}
        orbit={7}
        orbitDur={3.3}
        rotate={10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/jacks_asset_lettuce.png"
          alt=""
          width={1920}
          height={1280}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[10%] top-[46%] w-14 sm:right-[16%] sm:w-16"
        parallax={-65}
        orbit={8}
        orbitDur={3.7}
        rotate={-10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/jacks_asset_burger_box.png"
          alt=""
          width={1600}
          height={1600}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="left-[10%] top-[48%] w-16 sm:left-[14%] sm:w-18"
        parallax={-45}
        orbit={9}
        orbitDur={6.1}
        rotate={6}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/burger_fries.png"
          alt=""
          width={1600}
          height={1600}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — copy */}
        <div className="order-1 max-w-xl">
          <motion.p
            id="find-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Find Us
          </motion.p>

          <h2
            id="find-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
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

          {/* Address */}
          <motion.div
            id="find-address"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-8 flex items-start gap-4"
          >
            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-red shadow-[0_8px_30px_rgba(27,29,58,0.08)] ring-1 ring-navy-100">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="text-lg font-medium text-navy-800">
                Find your nearest Jack&rsquo;s
              </p>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/60">
                High Street, London
                <br />
                More sites opening soon across the UK
              </p>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            id="find-hours"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.72 }}
            className="mt-6 flex items-start gap-4"
          >
            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-blue shadow-[0_8px_30px_rgba(27,29,58,0.08)] ring-1 ring-navy-100">
              <Clock className="size-5" />
            </span>
            <div>
              <p className="text-lg font-medium text-navy-800">
                Mon–Sun · 11:30am – 9pm
              </p>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/60">
                Dine-in, takeaway &amp; delivery — order ahead to skip the
                queue.
              </p>
            </div>
          </motion.div>

          {/* Phone */}
          <div className="mt-6 flex items-start gap-4">
            <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-gold shadow-[0_8px_30px_rgba(27,29,58,0.08)] ring-1 ring-navy-100">
              <Phone className="size-5" />
            </span>
            <div>
              <a
                href={PHONE_HREF}
                className="text-lg font-medium text-navy-800 transition-colors hover:text-red"
              >
                {PHONE}
              </a>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/60">
                Or send us a message on Instagram{" "}
                <a
                  href="https://instagram.com/jacksburgeruk"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue transition-colors hover:text-navy-800"
                >
                  @jacksburgeruk
                </a>
              </p>
            </div>
          </div>

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
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy-800/20 px-7 text-sm font-medium text-navy-800 transition-all duration-300 hover:border-navy-800/40 hover:bg-white"
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
              <div className="relative overflow-hidden rounded-full border-8 border-white shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
                <NextImage
                  src="/images/jacks_chicken_burger_cutout.png"
                  alt="Jack's buttermilk chicken burger"
                  width={1920}
                  height={1280}
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
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-navy-800 uppercase shadow-lg backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-red" />
                  Jack&rsquo;s · High Street
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
