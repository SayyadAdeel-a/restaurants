"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Award,
  Bike,
  Drumstick,
  Flame,
  Leaf,
  Repeat,
  Rocket,
  Sparkles,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data — the real site's eight reasons ---------- */

type Reason = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

const reasons: Reason[] = [
  {
    title: "Smashed Burgers",
    desc: "Tender, juicy perfection that'll have you dreaming of your next bite.",
    icon: Flame,
  },
  {
    title: "Beyond Burgers",
    desc: "Grilled chicken, crispy loaded fries, thick shakes & our famous sweet chili fries that steal the show.",
    icon: Drumstick,
  },
  {
    title: "Proven Pros",
    desc: "From the geniuses behind Benllech Tandoori and other North Wales foodie gems.",
    icon: Award,
  },
  {
    title: "Halal Vibes",
    desc: "100% certified ingredients for quality you can taste and trust.",
    icon: Leaf,
  },
  {
    title: "Consistency is Key",
    desc: "Same great flavour every time — no burger surprises here.",
    icon: Repeat,
  },
  {
    title: "Spice Club Perks",
    desc: "Discounts that make every meal a little spicier (and sweeter).",
    icon: Sparkles,
  },
  {
    title: "Options Galore",
    desc: "Delivery, takeaway or dine-in — your burger, your rules.",
    icon: Bike,
  },
  {
    title: "Going Big",
    desc: "From North Wales to the UK, and maybe the universe — watch us grow!",
    icon: Rocket,
  },
];

/* ---------- Component ---------- */

export default function WhyJacksSection() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why"
      ref={rootRef}
      className="relative overflow-hidden bg-maroon py-24 lg:py-36"
    >
      {/* Warm red glow + a hint of flame at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(ellipse_at_bottom,rgba(237,28,36,0.28),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            id="why-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Why Jack&rsquo;s?
          </motion.p>

          <h2
            id="why-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Why Jack&rsquo;s Burger?
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-jacks italic">Kind of Awesome.</em>
              </motion.span>
            </span>
          </h2>

          <motion.p
            id="why-sub"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Because we&rsquo;re kind of awesome — but still chill. Eight very
            good reasons, straight from the grill.
          </motion.p>
        </div>

        {/* The eight reasons */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={reduceMotion ? false : { y: 36, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 + i * 0.09 }}
              whileHover={
                reduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }
              }
              className="rounded-3xl border border-cream/10 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-jacks text-ink shadow-[0_8px_24px_rgba(255,210,15,0.25)]">
                <r.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-bold text-cream">
                {r.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                {r.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
