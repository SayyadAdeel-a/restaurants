"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import NextImage from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data — real shots from the pass, cutouts and combos ---------- */

type Shot = {
  src: string;
  alt: string;
  caption: string;
  imgW: number;
  imgH: number;
  cellCls: string;
};

const shots: Shot[] = [
  {
    src: "/images/jacks_messy_hero_burger.png",
    alt: "Jack's flame-grilled smash burger, properly messy with cheese and sauce dripping",
    caption: "The Properly Messy Smash",
    imgW: 1600,
    imgH: 1066,
    cellCls: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/jacks_chicken_burger_cutout.png",
    alt: "Buttermilk-fried chicken burger with slaw",
    caption: "Buttermilk Chicken",
    imgW: 1920,
    imgH: 1280,
    cellCls: "",
  },
  {
    src: "/images/jacks_fries_cutout.png",
    alt: "Sweet chili fries loaded with glaze",
    caption: "Sweet Chili Fries",
    imgW: 1600,
    imgH: 1600,
    cellCls: "",
  },
  {
    src: "/images/burger_bacon_cheddar_combo.png",
    alt: "Bacon and cheddar smash combo with fries",
    caption: "Bacon & Cheddar Combo",
    imgW: 900,
    imgH: 600,
    cellCls: "md:col-span-2",
  },
  {
    src: "/images/jacks_scroll03_transparent_v2.png",
    alt: "The full spread — burgers, fries and rings",
    caption: "Burgers, Fries & Rings",
    imgW: 1600,
    imgH: 914,
    cellCls: "",
  },
];

/* ---------- Component ---------- */

export default function GalleryMarquee() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-jacks py-24 lg:py-36"
    >
      {/* Warm flame hint at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,26,0.35),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase"
          >
            Jack&rsquo;s Burger UK · The Gallery
          </motion.p>

          <h2
            id="gallery-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.02em] text-ink"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Properly Messy.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">Every Single Time.</em>
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Bento grid — one big messy smash, then the lineup */}
        <div className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-3 md:gap-6 lg:auto-rows-[260px]">
          {shots.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={reduceMotion ? false : { y: 36, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.12 }}
              className={`group relative overflow-hidden rounded-3xl bg-white p-2 shadow-[0_20px_50px_rgba(61,10,10,0.18)] ${shot.cellCls}`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <NextImage
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.imgW}
                  height={shot.imgH}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="px-3 py-2.5 font-mono text-[10px] tracking-[0.2em] text-ink/70 uppercase">
                {shot.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
