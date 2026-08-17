"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why"
      ref={rootRef}
      className="relative overflow-hidden bg-[#3B0A0A] py-16 lg:py-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-[120px]">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="why-title"

            className="mt-6 text-[36px] md:text-[48px] leading-[0.95] font-black tracking-[-0.03em] text-[#FFFFFF]"
          >
            Why Jack&rsquo;s Burger? <span className="text-[#FFD60A]">Kind of Awesome.</span>
          </h2>

          <motion.p
            id="why-sub"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-5 mx-auto max-w-md text-sm leading-relaxed text-[#FFFFFF]/60"
          >
            Because we&rsquo;re kind of awesome — but still chill. Eight very
            good reasons, straight from the grill.
          </motion.p>
        </div>

        {/* The eight reasons */}
        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={reduceMotion ? false : { y: 36, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 + i * 0.09 }}
              className="rounded-[12px] border border-[#2B0A0A] bg-[#4A1515] p-6 shadow-soft"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-[#FFD60A] text-[#0A0A0A] shadow-soft">
                <r.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-[14px] font-bold text-[#FFFFFF]">
                {r.title}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#FFFFFF]/60">
                {r.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
