"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

type Layer = {
  src: string;
  label: string;
  alt: string;
  imgW: number;
  imgH: number;
  rot: number; // flat display rotation (deg)
  dur: number; // bob cycle (s) — all different so they never sync
  bob: number; // bob amplitude (px)
};

const layers: Layer[] = [
  {
    src: "/images/jacks_asset_brioche.png",
    label: "Brioche",
    alt: "Fresh brioche bun",
    imgW: 1920,
    imgH: 1280,
    rot: -3,
    dur: 5.1,
    bob: 4,
  },
  {
    src: "/images/jacks_stack_lettuce_clean.png",
    label: "Lettuce",
    alt: "Crisp lettuce",
    imgW: 900,
    imgH: 600,
    rot: 2,
    dur: 4.6,
    bob: 5,
  },
  {
    src: "/images/burger_tomato.png",
    label: "Tomato",
    alt: "Fresh tomato",
    imgW: 1920,
    imgH: 1280,
    rot: -2,
    dur: 5.4,
    bob: 4,
  },
  {
    src: "/images/burger_cheese.png",
    label: "Cheddar",
    alt: "Melted cheddar",
    imgW: 1920,
    imgH: 1280,
    rot: 3,
    dur: 4.9,
    bob: 5,
  },
  {
    src: "/images/burger_bacon.png",
    label: "Bacon",
    alt: "Smoky bacon",
    imgW: 1920,
    imgH: 1280,
    rot: -2,
    dur: 5.6,
    bob: 4,
  },
  {
    src: "/images/jacks_asset_onion_rings.png",
    label: "Onion Rings",
    alt: "Onion rings",
    imgW: 1600,
    imgH: 1600,
    rot: 2,
    dur: 4.7,
    bob: 5,
  },
  {
    src: "/images/jacks_asset_pickle_lemon.png",
    label: "Pickles",
    alt: "Pickles and lemon",
    imgW: 1920,
    imgH: 1280,
    rot: -3,
    dur: 5.2,
    bob: 4,
  },
  {
    src: "/images/jacks_asset_jalapeno.png",
    label: "Jalapeños",
    alt: "Pickled jalapeños",
    imgW: 1920,
    imgH: 1280,
    rot: 2,
    dur: 4.4,
    bob: 5,
  },
  {
    src: "/images/jacks_stack_beef_patty.png",
    label: "Beef Patty",
    alt: "Flame-grilled beef patty",
    imgW: 1600,
    imgH: 1600,
    rot: -1,
    dur: 5.8,
    bob: 4,
  },
  {
    src: "/images/jacks_stack_bottom_bun.png",
    label: "Bottom Bun",
    alt: "Toasted bottom bun",
    imgW: 900,
    imgH: 900,
    rot: 2,
    dur: 5.3,
    bob: 5,
  },
];

/* ---------- Component ---------- */

export default function BuildBurgerSection() {
  const rootRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const figureInView = useInView(figureRef, { margin: "200px 0px" });


  const reduceMotion = useReducedMotion();

  // Active toppings — toggled from the chips or the fan. Starts fully stacked.
  const [active, setActive] = useState<string[]>(() =>
    layers.map((l) => l.src)
  );

  const toggle = (src: string) =>
    setActive((prev) =>
      prev.includes(src)
        ? prev.filter((s) => s !== src)
        : [...prev, src]
    );

  // Gentle parallax drift on the whole fan while scrolling
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const N = layers.length;

  return (
    <section
      id="build"
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950 py-24 lg:py-36"
    >
      {/* Soft red glow behind the fan */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[22%] h-[560px] w-[720px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — copy */}
        <div className="max-w-xl">
          <motion.p
            id="build-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Build Your Burger
          </motion.p>

          <h2
            id="build-title"

            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={
                  reduceMotion ? undefined : { y: 0 }
                }
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              >
                Stack It Your Way.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={
                  reduceMotion ? undefined : { y: 0 }
                }
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">No Two Alike.</em>
              </motion.span>
            </span>
          </h2>

          <motion.p
            id="build-sub"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-5 max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Every burger starts with flame-grilled British beef. Then pile it
            high — fresh brioche, crisp lettuce, smoky bacon and everything in
            between. Pick any combo, add-ons from 50p.
          </motion.p>

          {/* Topping chips — tap to add or remove a layer */}
          <motion.div
            id="build-chips"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
            className="mt-7"
          >
            <div className="flex flex-wrap gap-2.5">
              {layers.map((l) => {
                const on = active.includes(l.src);
                return (
                  <button
                    key={l.src}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(l.src)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ${
                      on
                        ? "border-red bg-red text-white shadow-red/25 hover:bg-crimson"
                        : "border-cream/15 bg-white/5 text-cream/70 hover:border-cream/40 hover:text-cream"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full transition-colors duration-300 ${
                        on ? "bg-white" : "bg-red"
                      }`}
                    />
                    {l.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-cream/50 uppercase">
              Tap a topping to add or remove it · {active.length}/{N} stacked
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            id="build-cta"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button className="h-12 rounded-full bg-red px-9 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
              <Phone className="size-4" />
              Order Now
            </Button>
            <a
              href="#menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-cream/25 px-7 text-sm font-medium text-cream transition-all duration-300 hover:border-cream/50 hover:bg-white/10"
            >
              See the Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right — the ingredients fanned across the counter */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <motion.div
            ref={figureRef}
            style={reduceMotion ? undefined : { y: figureY }}
            className="relative h-64 will-change-transform sm:h-72"
          >
            {layers.map((l, i) => {
              const on = active.includes(l.src);
              // Fan geometry: sweep the ten ingredients evenly across the
              // counter on a gentle arch, each tilted toward the middle.
              const t = N === 1 ? 0.5 : i / (N - 1);
              const left = 5 + t * 90;
              const bottom = 6 + 30 * (1 - Math.pow(2 * t - 1, 2));
              const tilt = (0.5 - t) * 24;
              return (
                <button
                  key={l.src}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(l.src)}
                  style={{ left: `${left}%`, bottom: `${bottom}%` }}
                  className={`group absolute flex w-14 -translate-x-1/2 flex-col items-center transition-opacity duration-300 sm:w-20 ${
                    on ? "" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  {/* Soft halo behind active ingredients */}
                  {on && (
                    <span
                      aria-hidden
                      className="absolute -inset-3 rounded-full bg-red/15 blur-lg"
                    />
                  )}

                  <span
                    style={{ transform: `rotate(${tilt + l.rot}deg)` }}
                    className="relative block"
                  >
                    <motion.span
                      className="flex h-14 w-full items-center justify-center sm:h-16"
                      animate={
                        reduceMotion || !figureInView
                          ? undefined
                          : { y: [0, -l.bob, 0] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: l.dur,
                        ease: "easeInOut",
                      }}
                    >
                      <NextImage
                        src={l.src}
                        alt={l.alt}
                        width={l.imgW}
                        height={l.imgH}
                        sizes="(max-width: 640px) 56px, 80px"
                        className="h-full w-auto object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.4)]"
                      />
                    </motion.span>
                  </span>

                  {/* Labels sit right under each item in a single row — tight
                      mono at 8px with reduced tracking keeps even the long
                      names ("Onion Rings") clear of the neighbours at the
                      flat arch peak. Active state is signalled by the halo
                      and label colour instead of a dot, which would widen
                      the labels and re-collide them. */}
                  <span
                    className={`mt-1.5 flex items-center justify-center truncate font-mono text-[8px] tracking-[0.06em] uppercase transition-colors duration-300 ${
                      on ? "text-cream" : "text-cream/45"
                    }`}
                  >
                    <span className="truncate">{l.label}</span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Counter line the fan rests on */}
          <div
            aria-hidden
            className="relative mx-auto mt-1 h-1.5 w-full max-w-xl rounded-full bg-cream/15"
          />
        </motion.div>
      </div>
    </section>
  );
}
