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
import { ArrowRight, Star } from "lucide-react";
import Scatter from "@/components/Scatter";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TRIPADVISOR_URL =
  "https://www.tripadvisor.co.uk/RestaurantsNear-g186338-d19115661-London_England.html";

/* ---------- Avatar circle ---------- */

function Avatar({ initials, tone }: { initials: string; tone: string }) {
  return (
    <span
      className={`flex size-10 items-center justify-center rounded-full text-[11px] font-semibold text-cream ring-2 ring-cream shadow-md sm:size-11 ${tone}`}
    >
      {initials}
    </span>
  );
}

/* ---------- Section ---------- */

export default function ReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const burgerInView = useInView(burgerRef, { margin: "200px 0px" });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  // Shared scroll progress for the parallax on the burger + edge scatters
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const burgerY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      {/* Soft red glow behind the burger */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[28%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/30 blur-3xl"
      />

      {/* Edge scatters — flames, ribbon & fries drifting down from Bestsellers */}
      <Scatter
        posCls="left-[4%] top-[12%] w-12 sm:left-[6%] sm:w-14"
        parallax={-45}
        orbit={8}
        orbitDur={5.4}
        rotate={-12}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/jacks_asset_pickle_lemon.png"
          alt=""
          width={1920}
          height={1280}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[5%] top-[14%] w-12 sm:right-[8%] sm:w-14"
        parallax={-65}
        orbit={7}
        orbitDur={3.2}
        rotate={10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/jacks_asset_onion_rings.png"
          alt=""
          width={1600}
          height={1600}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="left-[12%] top-[48%] w-16 sm:left-[16%] sm:w-18"
        parallax={-45}
        orbit={8}
        orbitDur={6.2}
        rotate={6}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/burger_tomato.png"
          alt=""
          width={1920}
          height={1280}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>
      <Scatter
        posCls="right-[10%] top-[50%] w-12 sm:right-[14%] sm:w-14"
        parallax={-65}
        orbit={9}
        orbitDur={3.6}
        rotate={-10}
        progress={scrollYProgress}
      >
        <NextImage
          src="/images/jacks_asset_brioche.png"
          alt=""
          width={1920}
          height={1280}
          sizes="96px"
          className="h-auto w-full object-contain"
        />
      </Scatter>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:px-10">
        {/* Left — the huge smash burger */}
        <div className="relative order-2 mx-auto w-[min(78vw,430px)] lg:order-1 lg:w-[min(40vw,520px)]">
          <motion.div style={reduceMotion ? undefined : { y: burgerY }}>
            {/* Burger — floats forever on a slow 8s cycle */}
            <motion.div
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
              <motion.div
                id="rev-burger-inner"
                ref={burgerRef}
                className="relative will-change-transform"
              animate={
                reduceMotion || !burgerInView ? undefined : { y: [0, -15, 0] }
              }
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            >
              <NextImage
                src="/images/jacks_smash_burger_cutout.png"
                alt="Jack's signature smash burger"
                width={1600}
                height={1600}
                sizes="(max-width: 1024px) 78vw, 520px"
                className="relative h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
              />

              {/* Award tag — bespoke, like the Bestsellers champion chip */}
              <span className="absolute -top-3 right-0 rotate-6 rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase shadow-lg shadow-gold/25">
                ✦ Jack&rsquo;s Signature
              </span>

              {/* Flame + fries drifting around the burger */}
              <motion.div
                className="absolute -left-6 top-[14%] w-12 -rotate-12 sm:-left-10 sm:w-14 will-change-transform"
                animate={
                  reduceMotion || !burgerInView ? undefined : { y: [0, -8, 0] }
                }
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/burger_cheese.png"
                  alt=""
                  width={1920}
                  height={1280}
                  sizes="96px"
                  className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-[12%] w-16 rotate-12 sm:-right-8 sm:w-18 will-change-transform"
                animate={
                  reduceMotion || !burgerInView ? undefined : { y: [0, 9, 0] }
                }
                transition={{ repeat: Infinity, duration: 5.1, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/burger_fries.png"
                  alt=""
                  width={1600}
                  height={1600}
                  sizes="96px"
                  className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                />
              </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — social proof */}
        <div className="order-1 max-w-xl lg:order-2">
          <motion.p
            id="rev-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Social Proof
          </motion.p>

          <h2
            id="rev-title"
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
                TripAdvisor&rsquo;s #1.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">A Thousand Reasons.</em>
              </motion.span>
            </span>
          </h2>

          {/* Flame medallion + award line — same bespoke touch as Bestsellers */}
          <div className="mt-5 flex items-center gap-2.5">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue/40">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/images/svg-2.svg"
                alt=""
                className="size-4 object-contain"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-navy-800/60 uppercase">
              Flame-Grilled · Made to Order
            </span>
          </div>

          {/* Stars */}
          <motion.div
            id="rev-stars"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-6 flex items-center gap-3"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-mono text-lg font-medium text-navy-800">
              4.9 / 5
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-navy-800/50 uppercase">
              from 1,000+ reviews
            </span>
          </motion.div>

          {/* Real TripAdvisor quote */}
          <motion.blockquote
            id="rev-quote"
            initial={reduceMotion ? false : { y: 22, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-8"
          >
            <p className="font-serif text-2xl leading-snug text-navy-800 italic sm:text-[1.75rem]">
              “Best burger we&rsquo;ve had in the UK. Charred edges, juicy
              middle, stacked high — worth the detour.”
            </p>
            <motion.footer
              id="rev-author"
              initial={reduceMotion ? false : { y: 12, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.95 }}
              className="mt-4 font-mono text-[11px] tracking-[0.26em] text-navy-800/60 uppercase"
            >
              — Sarah M. · TripAdvisor
            </motion.footer>
          </motion.blockquote>

          {/* Avatars + badges */}
          <div className="mt-8 flex items-center gap-3">
            <motion.div
              id="rev-avatars"
              initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.55, ease: "backOut", delay: 1.05 }}
              className="flex -space-x-3"
            >
              <Avatar initials="SM" tone="bg-navy-800" />
              <Avatar initials="KM" tone="bg-navy-600" />
              <Avatar initials="JP" tone="bg-blue" />
            </motion.div>
            <p className="text-sm text-navy-800/60">
              Loved by <span className="font-semibold text-navy-800">1,000+</span>{" "}
              burger regulars
            </p>
          </div>

          <motion.div
            id="rev-badges"
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 1.35 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            {/* TripAdvisor badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 shadow-[0_8px_30px_rgba(27,29,58,0.08)]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#00af87] font-sans text-[9px] font-bold text-white">
                TA
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-navy-800 uppercase">
                TripAdvisor · #1 Burger
              </span>
            </span>
            {/* Rating badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2">
              <Star className="size-3.5 fill-gold text-gold" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
                4.9 / 5 · 1,000+ Reviews
              </span>
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            id="rev-cta"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
            >
              Read Reviews
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy-800/20 px-7 text-sm font-medium text-navy-800 transition-all duration-300 hover:border-navy-800/40 hover:bg-white"
            >
              Find a Jack&rsquo;s Near You
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
