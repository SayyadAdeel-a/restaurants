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
import { Quote, Newspaper } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pressLogos = [
  { name: "Ireland.com", note: "Featured" },
  { name: "TripAdvisor", note: "#1 Quick Bites" },
  { name: "Sluurpy", note: "4.4/5 · 1,772 reviews" },
];

const reviews = [
  {
    quote: "What a gem situated at Killybegs harbour!!",
    name: "TripAdvisor Review",
    meta: "★★★★★",
    highlight: true,
  },
  {
    quote: "Best calamari ever",
    name: "TripAdvisor Review",
    meta: "★★★★★",
  },
  {
    quote: "Queue even before they opened at 12.30!",
    name: "TripAdvisor Review",
    meta: "★★★★★",
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article
      className={`w-[320px] shrink-0 rounded-3xl border p-7 shadow-[0_20px_44px_-18px_rgba(27,29,58,0.2)] sm:w-[380px] ${
        review.highlight
          ? "border-gold/40 bg-navy-950 text-cream"
          : "border-navy-100 bg-white"
      }`}
    >
      <Quote
        className={`size-6 ${review.highlight ? "text-gold" : "text-blue"}`}
      />
      <p
        className={`mt-4 font-serif text-xl leading-snug italic sm:text-2xl ${
          review.highlight ? "text-cream" : "text-navy-800"
        }`}
      >
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center justify-between">
        <span
          className={`font-mono text-[10px] tracking-[0.24em] uppercase ${
            review.highlight ? "text-cream/55" : "text-navy-800/45"
          }`}
        >
          {review.name}
        </span>
        <span className={`text-sm tracking-wider ${review.highlight ? "text-gold" : "text-gold"}`}>
          {review.meta}
        </span>
      </div>
    </article>
  );
}

export default function PressReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const mayoY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const lemonY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      tl.from("#press-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#press-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from(".press-logo", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.55)
        .from(".review-marquee", { opacity: 0, duration: 0.8 }, 0.75);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-32"
    >
      {/* Floating garlic mayo — bottom-right */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: mayoY }}
        className="pointer-events-none absolute right-[-5%] bottom-[-4%] z-0 w-64 opacity-10 sm:w-80"
      >
        <motion.img
          src="/images/dish/bento_garlic_mayo.webp"
          alt=""
          animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="w-full"
        />
      </motion.div>

      {/* Floating lemon wedge — top-left */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: lemonY }}
        className="pointer-events-none absolute top-[12%] left-[-3%] z-0 w-20 opacity-20 sm:w-24"
      >
        <motion.img
          src="/images/dish/killybegs_lemon_clean.png"
          alt=""
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
          className="w-full"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="max-w-2xl">
          <p
            id="press-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            <Newspaper className="size-3.5 text-blue" />
            07 — Press &amp; Reviews
          </p>
          <h2
            id="press-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Let the</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                harbour <em className="text-blue italic">speak.</em>
              </span>
            </span>
          </h2>
        </div>

        {/* Press logos */}
        <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6 border-y border-navy-100 py-6">
          {pressLogos.map((logo) => (
            <div key={logo.name} className="press-logo flex items-baseline gap-3">
              <span className="font-serif text-2xl font-semibold tracking-tight text-navy-800/70 sm:text-3xl">
                {logo.name}
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-navy-800/40 uppercase">
                {logo.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review marquee */}
      <div className="review-marquee relative z-10 mt-12">
        {reduceMotion ? (
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-5">
            {reviews.map((r) => (
              <ReviewCard key={r.quote} review={r} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <motion.div
              className="flex w-max gap-6 pl-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[...reviews, ...reviews, ...reviews, ...reviews].map((r, i) => (
                <ReviewCard key={`${r.quote}-${i}`} review={r} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
