"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

type Box = {
  src: string;
  alt: string;
  name: string;
  desc: string;
  price: string;
  dur: number; // float cycle length (s) — 5, 6, 7 so they never sync
  wCls: string; // width
  imgW: number;
  imgH: number;
  champion?: boolean;
};

const boxes: Box[] = [
  {
    src: "/images/jacks_smash_burger_cutout.png",
    alt: "Classic Smash Burger — flame-grilled British beef, melted cheese and house sauce",
    name: "Classic Smash Burger",
    desc: "Flame-grilled British beef, melted cheese & house sauce",
    price: "£6.50",
    dur: 5,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1600,
    imgH: 1600,
  },
  {
    src: "/images/jacks_scroll01_transparent_v2.png",
    alt: "Duo Smash Burger — double flame-grilled beef, double cheese and house sauce",
    name: "Duo Smash Burger",
    desc: "Double flame-grilled beef, double cheese & house sauce",
    price: "£7.50",
    dur: 6,
    wCls: "w-56 md:w-52 lg:w-[17.6rem]", // 10% bigger — the bestseller
    imgW: 1600,
    imgH: 1066,
    champion: true,
  },
  {
    src: "/images/burger_bacon_cheddar_combo.png",
    alt: "Trio Smash Burger — triple flame-grilled beef, triple cheese and all the sauce",
    name: "Trio Smash Burger",
    desc: "Triple flame-grilled beef, triple cheese & all the sauce",
    price: "£9.95",
    dur: 7,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 900,
    imgH: 600,
  },
  {
    src: "/images/jacks_top_burger_transparent.png",
    alt: "Hot Smash Burger — fiery smash with jalapeños, chilli and Jack's hot sauce",
    name: "Hot Smash Burger",
    desc: "Fiery smash, jalapeños, chilli & Jack's hot sauce",
    price: "£8.50",
    dur: 8,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1600,
    imgH: 914,
  },
  {
    src: "/images/burger_fries.png",
    alt: "Sweet Chili Fries — crispy loaded fries with Jack's famous sweet chili glaze",
    name: "Sweet Chili Fries",
    desc: "Crispy loaded fries with our famous sweet chili glaze",
    price: "£3.50",
    dur: 9,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1600,
    imgH: 1600,
  },
  {
    src: "/images/jacks_chicken_burger_cutout.png",
    alt: "The Chicken Burger — buttermilk-fried chicken, slaw and hot honey mayo",
    name: "The Chicken Burger",
    desc: "Buttermilk-fried chicken, crunchy slaw & hot honey mayo",
    price: "£8.95",
    dur: 10,
    wCls: "w-52 md:w-48 lg:w-64",
    imgW: 1920,
    imgH: 1280,
  },
];

/* ---------- Component ---------- */

export default function BoxesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const boxesInView = useInView(boxesRef, { margin: "200px 0px" });


  const reduceMotion = useReducedMotion();

  return (
    <section
      id="menu"
      ref={rootRef}
      className="relative overflow-hidden bg-jacks py-24 lg:py-36"
    >
      {/* Soft red glow — same as the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[640px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            id="boxes-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase"
          >
            Jack&rsquo;s Burger UK · Flame-Grilled
          </motion.p>

          <h2
            id="boxes-title"

            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-ink"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Six Bestsellers.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : { y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              >
                <em className="text-blue italic">Zero Filler.</em>
              </motion.span>
            </span>
          </h2>

          {/* Flame medallion + provenance line */}
          <motion.div
            id="boxes-rope"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-5 flex items-center justify-center gap-2.5"
          >
            <span className="relative flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue/40">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/images/svg-2.svg"
                alt=""
                className="size-4 object-contain"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-ink/65 uppercase">
              British Beef · Baked Fresh · No Fillers
            </span>
          </motion.div>

          <motion.p
            id="boxes-sub"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-ink/70 sm:text-lg"
          >
            100% British beef, flame-grilled to order and stacked into toasted
            brioche — no fillers, no shortcuts.
          </motion.p>
        </div>

        {/* The three big boxes — floating, never synced */}
        <div
          ref={boxesRef}
          className="mt-10 flex flex-col items-center gap-14 md:flex-row md:flex-wrap md:items-end md:justify-center md:gap-x-8 md:gap-y-14 lg:gap-x-16"
        >
          {boxes.map((box, i) => (
            <motion.div
              key={box.name}
              initial={reduceMotion ? false : { y: 44, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.14 }}
              className={
                box.champion ? "boxes-item md:mb-5" : "boxes-item"
              }
            >
              <motion.div
                className="flex flex-col items-center will-change-transform"
                animate={
                  reduceMotion || !boxesInView
                    ? undefined
                    : { y: [0, -12, 0] }
                }
                transition={{
                  repeat: Infinity,
                  duration: box.dur,
                  ease: "easeInOut",
                }}
              >
                <div className={`relative ${box.wCls}`}>
                  <NextImage
                    src={box.src}
                    alt={box.alt}
                    width={box.imgW}
                    height={box.imgH}
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 280px, 320px"
                    className="relative h-auto w-full object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="mt-8 text-center">
                  {box.champion && (
                    <p className="mb-1 font-mono text-[9px] tracking-[0.26em] text-gold uppercase">
                      ✦ Best Selling
                    </p>
                  )}
                  <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                    {box.name}
                  </h3>
                  <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-ink/70">
                    {box.desc}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-red px-4 py-1 font-mono text-sm font-medium text-white shadow-md shadow-red/25">
                    {box.price}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA — same red order button as the hero */}
        <motion.div
          id="boxes-cta"
          initial={reduceMotion ? false : { y: 16, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
          className="mt-16 flex justify-center"
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
