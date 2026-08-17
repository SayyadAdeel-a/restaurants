"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Data ---------- */

type Layer = {
  src: string;
  label: string;
  alt: string;
  imgW: number;
  imgH: number;
  cls: string; // width only — the buns run slightly wider than the filling
  mt: string; // negative top margin — tucks each layer under the one above
  rz: number; // flat rotation (deg)
  ry: number; // 3D yaw (deg) — alternates so each ingredient peeks around the burger
};

const layers: Layer[] = [
  {
    src: "/images/jacks_asset_brioche.png",
    label: "Brioche",
    alt: "Fresh brioche bun",
    imgW: 1920,
    imgH: 1280,
    cls: "w-44 sm:w-48",
    mt: "",
    rz: -3,
    ry: 0,
  },
  {
    src: "/images/jacks_stack_lettuce_clean.png",
    label: "Lettuce",
    alt: "Crisp lettuce",
    imgW: 900,
    imgH: 600,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: 2,
    ry: 5,
  },
  {
    src: "/images/burger_tomato.png",
    label: "Tomato",
    alt: "Fresh tomato",
    imgW: 1920,
    imgH: 1280,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: -2,
    ry: -4,
  },
  {
    src: "/images/burger_cheese.png",
    label: "Cheddar",
    alt: "Melted cheddar",
    imgW: 1920,
    imgH: 1280,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: 3,
    ry: 4,
  },
  {
    src: "/images/burger_bacon.png",
    label: "Bacon",
    alt: "Smoky bacon",
    imgW: 1920,
    imgH: 1280,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: -2,
    ry: -5,
  },
  {
    src: "/images/jacks_asset_onion_rings.png",
    label: "Onion Rings",
    alt: "Onion rings",
    imgW: 1600,
    imgH: 1600,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: 2,
    ry: 3,
  },
  {
    src: "/images/jacks_asset_pickle_lemon.png",
    label: "Pickles",
    alt: "Pickles and lemon",
    imgW: 1920,
    imgH: 1280,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: -3,
    ry: 4,
  },
  {
    src: "/images/jacks_asset_jalapeno.png",
    label: "Jalapeños",
    alt: "Pickled jalapeños",
    imgW: 1920,
    imgH: 1280,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: 2,
    ry: -3,
  },
  {
    src: "/images/jacks_stack_beef_patty.png",
    label: "Beef Patty",
    alt: "Flame-grilled beef patty",
    imgW: 1600,
    imgH: 1600,
    cls: "w-40 sm:w-44",
    mt: "-mt-24",
    rz: -1,
    ry: -2,
  },
  {
    src: "/images/jacks_stack_bottom_bun.png",
    label: "Bottom Bun",
    alt: "Toasted bottom bun",
    imgW: 900,
    imgH: 900,
    cls: "w-44 sm:w-48",
    mt: "-mt-24",
    rz: 2,
    ry: 0,
  },
];

/* ---------- Component ---------- */

export default function BuildBurgerSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackInView = useInView(stackRef, { margin: "200px 0px" });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  // Active parts — toggled from the manifest. Starts fully assembled.
  const [active, setActive] = useState<string[]>(() =>
    layers.map((l) => l.src)
  );

  const toggle = (src: string) =>
    setActive((prev) =>
      prev.includes(src)
        ? prev.filter((s) => s !== src)
        : [...prev, src]
    );

  // Gentle parallax drift on the whole stack while scrolling
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      id="build"
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 py-24 lg:py-36"
    >
      {/* Blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:36px_36px]"
      />
      {/* Vignette to keep the edges dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(15,15,15,0.5)_100%)]"
      />
      {/* Soft red glow behind the assembly */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[26%] h-[620px] w-[620px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red/20 blur-3xl"
      />

      {/* Drawing title block — like the corner of an engineering sheet */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 bottom-6 hidden border border-cream/15 px-4 py-3 font-mono text-[9px] leading-relaxed tracking-[0.22em] text-cream/40 uppercase lg:block"
      >
        Jack&rsquo;s Burger UK · Assembly Guide
        <br />
        Scale 1:1 · Sheet 01 of 01
        <br />
        <span className="text-blue">Rev C · Est. 2024</span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
        {/* Left — spec sheet + parts manifest */}
        <div className="max-w-xl">
          <motion.p
            id="build-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            <span className="text-blue">+</span> Jack&rsquo;s Burger UK ·
            Assembly Guide
          </motion.p>

          <h2
            id="build-title"
            ref={titleRef}
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={
                  reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }
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
                  reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }
                }
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">No Two Alike.</em>
              </motion.span>
            </span>
          </h2>

          {/* Spec strip */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] tracking-[0.28em] text-cream/40 uppercase"
          >
            <span className="text-blue">Spec</span>
            <span aria-hidden className="size-1 rotate-45 bg-cream/30" />
            <span>10 Parts</span>
            <span aria-hidden className="size-1 rotate-45 bg-cream/30" />
            <span>Flame-Grilled</span>
            <span aria-hidden className="size-1 rotate-45 bg-cream/30" />
            <span>Built to Order</span>
          </motion.div>

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

          {/* Parts manifest — tap a part to mount or remove it */}
          <motion.div
            id="build-chips"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
            className="mt-7"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-2.5">
              {layers.map((l, i) => {
                const on = active.includes(l.src);
                return (
                  <button
                    key={l.src}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(l.src)}
                    className={`group flex min-w-0 flex-col gap-1.5 rounded-md border px-3 py-2.5 text-left transition-all duration-300 ${
                      on
                        ? "border-red/60 bg-red/10 shadow-[0_0_24px_rgba(237,28,36,0.12)]"
                        : "border-cream/12 bg-white/[0.03] hover:border-cream/30 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[8px] tracking-[0.08em] ${
                          on ? "text-blue" : "text-cream/35"
                        }`}
                      >
                        J-{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex size-4 items-center justify-center rounded-[3px] border transition-colors duration-300 ${
                          on ? "border-blue bg-blue" : "border-cream/25"
                        }`}
                      >
                        {on && (
                          <Check
                            className="size-3 text-white"
                            strokeWidth={3}
                            aria-hidden
                          />
                        )}
                      </span>
                    </span>
                    <span
                      className={`min-w-0 truncate font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                        on ? "text-cream" : "text-cream/60"
                      }`}
                    >
                      {l.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-cream/50 uppercase">
              Tap a part to mount or remove it · {active.length}/{layers.length}{" "}
              parts mounted
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

        {/* Right — the assembly figure */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="relative mx-auto w-fit"
        >
          {/* Dashed drawing frame */}
          <div
            aria-hidden
            className="absolute -inset-7 rounded-2xl border border-dashed border-cream/15"
          />
          {/* Frame corner ticks */}
          <span
            aria-hidden
            className="absolute -top-[3px] -left-[3px] size-5 border-t-2 border-l-2 border-cream/40"
          />
          <span
            aria-hidden
            className="absolute -top-[3px] -right-[3px] size-5 border-t-2 border-r-2 border-cream/40"
          />
          <span
            aria-hidden
            className="absolute -bottom-[3px] -left-[3px] size-5 border-b-2 border-l-2 border-cream/40"
          />
          <span
            aria-hidden
            className="absolute -right-[3px] -bottom-[3px] size-5 border-r-2 border-b-2 border-cream/40"
          />

          {/* Figure caption */}
          <div
            aria-hidden
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-cream/40 uppercase"
          >
            Fig. 01 — Final Assembly
          </div>

          {/* Dimension callouts */}
          <div
            aria-hidden
            className="absolute top-1/2 -left-20 hidden -translate-y-1/2 font-mono text-[9px] tracking-[0.3em] text-cream/30 uppercase lg:block [writing-mode:vertical-rl]"
          >
            Model J-01
          </div>
          <div
            aria-hidden
            className="absolute top-1/2 -right-20 hidden -translate-y-1/2 rotate-180 font-mono text-[9px] tracking-[0.3em] text-cream/30 uppercase lg:block [writing-mode:vertical-rl]"
          >
            H 3.5&quot; · Stacked to Order
          </div>

          {/* The burger */}
          <div className="relative mt-8 [perspective:1100px]">
            {/* Elliptical ground shadow under the burger */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-9 left-1/2 h-10 w-56 -translate-x-1/2 rounded-[50%] bg-black/45 blur-2xl"
            />

            {/* Tilt the burger toward the viewer for a 3D read — viewed from
                above, like the ingredient photos, so the top bun sits in front */}
            <div className="[transform-style:preserve-3d] [transform:rotateX(-14deg)]">
              <motion.div style={reduceMotion ? undefined : { y: stackY }}>
                <motion.div
                  ref={stackRef}
                  className="relative flex flex-col items-center will-change-transform"
                  animate={
                    reduceMotion || !stackInView ? undefined : { y: [0, -10, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                >
                  <AnimatePresence>
                    {layers
                      .filter((l) => active.includes(l.src))
                      .map((l, i) => (
                        <motion.div
                          key={l.src}
                          layout={!reduceMotion}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: reduceMotion ? 0 : 0.35 }}
                        >
                          <div
                            className={`build-layer relative ${l.mt} ${l.cls}`}
                            style={{
                              zIndex: active.length - i,
                              transform: `rotate(${l.rz}deg) rotateY(${l.ry}deg)`,
                            }}
                          >
                            <NextImage
                              src={l.src}
                              alt={l.alt}
                              width={l.imgW}
                              height={l.imgH}
                              sizes="(max-width: 1024px) 176px, 192px"
                              className="h-auto w-full object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]"
                            />
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Plinth the assembly stands on */}
          <div
            aria-hidden
            className="relative mx-auto mt-1 h-1.5 w-64 rounded-full bg-cream/15"
          />
        </motion.div>
      </div>
    </section>
  );
}
