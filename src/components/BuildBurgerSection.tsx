"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Data ---------- */

type Layer = {
  src: string;
  label: string;
  alt: string;
  imgW: number;
  imgH: number;
  cls: string; // rotation + width
  mt: string; // negative top margin — overlaps the layer below
  dur: number; // bob cycle (s) — all different so they never sync
  bob: number; // idle bob amplitude (px)
};

const layers: Layer[] = [
  {
    src: "/images/jacks_asset_brioche.png",
    label: "Brioche",
    alt: "Fresh brioche bun",
    imgW: 1920,
    imgH: 1280,
    cls: "-rotate-3 w-52 sm:w-60",
    mt: "",
    dur: 4.2,
    bob: 7,
  },
  {
    src: "/images/jacks_asset_lettuce.png",
    label: "Lettuce",
    alt: "Crisp lettuce",
    imgW: 1920,
    imgH: 1280,
    cls: "rotate-2 w-44 sm:w-52",
    mt: "-mt-10",
    dur: 5.1,
    bob: 9,
  },
  {
    src: "/images/burger_tomato.png",
    label: "Tomato",
    alt: "Fresh tomato",
    imgW: 1920,
    imgH: 1280,
    cls: "-rotate-2 w-40 sm:w-48",
    mt: "-mt-9",
    dur: 4.6,
    bob: 6,
  },
  {
    src: "/images/burger_cheese.png",
    label: "Cheddar",
    alt: "Melted cheddar",
    imgW: 1920,
    imgH: 1280,
    cls: "rotate-3 w-44 sm:w-52",
    mt: "-mt-8",
    dur: 5.6,
    bob: 8,
  },
  {
    src: "/images/burger_bacon.png",
    label: "Bacon",
    alt: "Smoky bacon",
    imgW: 1920,
    imgH: 1280,
    cls: "-rotate-2 w-48 sm:w-56",
    mt: "-mt-10",
    dur: 4.9,
    bob: 7,
  },
  {
    src: "/images/jacks_asset_onion_rings.png",
    label: "Onion Rings",
    alt: "Onion rings",
    imgW: 1600,
    imgH: 1600,
    cls: "rotate-2 w-40 sm:w-48",
    mt: "-mt-7",
    dur: 5.4,
    bob: 9,
  },
  {
    src: "/images/jacks_asset_pickle_lemon.png",
    label: "Pickles",
    alt: "Pickles and lemon",
    imgW: 1920,
    imgH: 1280,
    cls: "-rotate-3 w-44 sm:w-52",
    mt: "-mt-6",
    dur: 4.4,
    bob: 6,
  },
];

/* ---------- Component ---------- */

export default function BuildBurgerSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackInView = useInView(stackRef, { margin: "200px 0px" });
  const reduceMotion = useReducedMotion();

  // Active topping layers — toggled from the chips. Starts fully stacked.
  const [active, setActive] = useState<string[]>(
    () => layers.map((l) => l.src)
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

  // Entrance timeline — same language as the other sections
  useGSAP(
    () => {
      if (reduceMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });
      tl.from("#build-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(
          "#build-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          0.25
        )
        .from("#build-sub", { y: 18, opacity: 0, duration: 0.7 }, 0.6)
        .from("#build-chips", { y: 16, opacity: 0, duration: 0.6 }, 0.75)
        .from("#build-cta", { y: 14, opacity: 0, duration: 0.6 }, 0.9)
        .from(
          ".build-layer",
          { scale: 0.7, opacity: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.6)" },
          0.45
        );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="build"
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 py-24 lg:py-36"
    >
      {/* Soft red glow behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[26%] h-[620px] w-[620px] -translate-y-1/2 translate-x-1/2 rounded-full bg-red/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        {/* Left — copy */}
        <div className="max-w-xl">
          <p
            id="build-eyebrow"
            className="font-mono text-[11px] tracking-[0.32em] text-cream/50 uppercase"
          >
            Jack&rsquo;s Burger UK · Build Your Burger
          </p>

          <h2
            id="build-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-cream"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Stack It Your Way.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">No Two Alike.</em>
              </span>
            </span>
          </h2>

          <p
            id="build-sub"
            className="mt-5 max-w-md text-base leading-relaxed text-cream/60 sm:text-lg"
          >
            Every burger starts with flame-grilled British beef. Then pile it
            high — fresh brioche, crisp lettuce, smoky bacon and everything in
            between. Pick any combo, add-ons from 50p.
          </p>

          {/* Topping chips — tap to add or remove a layer */}
          <div id="build-chips" className="mt-7">
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
              Tap a topping to add or remove it · {active.length}/{layers.length}{" "}
              stacked
            </p>
          </div>

          {/* CTA */}
          <div id="build-cta" className="mt-9 flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        {/* Right — the ingredient stack, each layer bobbing on its own cycle */}
        <div className="relative mx-auto w-fit">
          <motion.div style={reduceMotion ? undefined : { y: stackY }}>
            <motion.div
              ref={stackRef}
              className="flex flex-col items-center will-change-transform"
            >
              <AnimatePresence>
                {layers
                  .filter((l) => active.includes(l.src))
                  .map((l) => (
                    <motion.div
                      key={l.src}
                      layout={!reduceMotion}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                    >
                      <motion.div
                        className={`build-layer ${l.mt} ${l.cls} will-change-transform`}
                        animate={
                          reduceMotion || !stackInView
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
                          sizes="(max-width: 1024px) 208px, 240px"
                          className="h-auto w-full object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.14)]"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
