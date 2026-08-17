"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

type Deal = {
  src: string;
  alt: string;
  name: string;
  desc: string;
  price: string;
  tag: string;
  imgW: number;
  imgH: number;
};

const deals: Deal[] = [
  {
    src: "/images/jacks_smash_burger_cutout.png",
    alt: "The Stack Deal — Duo Smash, sweet chili fries and a drink",
    name: "The Stack Deal",
    desc: "Duo Smash, sweet chili fries & a drink",
    price: "£10.95",
    tag: "Best Value",
    imgW: 1600,
    imgH: 1600,
  },
  {
    src: "/images/jacks_asset_onion_rings.png",
    alt: "Ring the Changes — onion rings on any smash",
    name: "Ring the Changes",
    desc: "Add a side of golden onion rings to any smash",
    price: "+£2.50",
    tag: "Limited Time",
    imgW: 1600,
    imgH: 1600,
  },
  {
    src: "/images/jacks_asset_burger_box.png",
    alt: "The Family Box — two smash burgers, two fries and onion rings to share",
    name: "The Family Box",
    desc: "2 smash burgers (your pick), 2 fries & 4 onion rings to share",
    price: "£24.95",
    tag: "Feeds 4",
    imgW: 1600,
    imgH: 1600,
  },
  {
    src: "/images/burger_bacon_cheddar_combo.png",
    alt: "The Bacon & Cheddar Combo — Classic Smash loaded with bacon and cheddar, fries and a drink",
    name: "The Bacon & Cheddar Combo",
    desc: "Classic Smash loaded with bacon & cheddar, fries & a drink",
    price: "£11.95",
    tag: "New",
    imgW: 900,
    imgH: 600,
  },
];

/* ---------- Component ---------- */

export default function SpecialsSection() {
  const rootRef = useRef<HTMLElement>(null);


  const reduceMotion = useReducedMotion();

  return (
    <section
      id="deals"
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950 py-24 lg:py-36"
    >
      {/* Soft red glow behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            id="deals-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Deals
          </motion.p>

          <h2
            id="deals-title"

            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Big Taste.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">Better Deals.</em>
              </motion.span>
            </span>
          </h2>

          <motion.p
            id="deals-sub"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Real smash burgers, bundled into proper value. Ask in store or quote
            the deal when you call ahead.
          </motion.p>
        </div>

        {/* The deal cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {deals.map((deal, i) => (
            <motion.article
              key={deal.name}
              initial={reduceMotion ? false : { y: 44, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.14 }}
              whileHover={
                reduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }
              }
              className="deals-item relative flex flex-col items-center rounded-3xl border border-cream/10 bg-white/5 p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            >
              {/* Tag */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red px-4 py-1 font-mono text-[9px] font-medium tracking-[0.22em] text-white uppercase shadow-md shadow-red/25">
                {deal.tag}
              </span>

              <div className="mt-4 h-40 w-full sm:h-44">
                <NextImage
                  src={deal.src}
                  alt={deal.alt}
                  width={deal.imgW}
                  height={deal.imgH}
                  sizes="(max-width: 768px) 320px, 300px"
                  className="mx-auto h-full w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.14)]"
                />
              </div>

              <h3 className="mt-5 font-serif text-xl font-bold text-cream sm:text-2xl">
                {deal.name}
              </h3>
              <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-cream/60">
                {deal.desc}
              </p>
              <span className="mt-4 inline-block rounded-full bg-red px-4 py-1 font-mono text-sm font-medium text-white shadow-md shadow-red/25">
                {deal.price}
              </span>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          id="deals-cta"
          initial={reduceMotion ? false : { y: 16, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
          className="mt-14 flex justify-center"
        >
          <Button className="h-12 rounded-full bg-red px-9 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
            <Phone className="size-4" />
            Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
