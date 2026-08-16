"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FRAME_COUNT = 40;
const FRAME_DIR = "/frames/hero-signature-box";
const pad = (n: number) => String(n).padStart(3, "0");

export default function OpeningSection() {
  const rootRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) return;

      // Crossfade cascade: each frame fades in over the previous (DOM order stacks them).
      // The cascade is compressed into the first CASCADE_END of the section's passage, so the
      // door is fully open just before the section fills the screen, then holds as it scrolls
      // away — no pin, nothing frozen for the animation's sake.
      const CASCADE_END = 0.25;
      const frames = gsap.utils.toArray<HTMLElement>(".opening-frame");
      const step = CASCADE_END / (frames.length - 1);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          // Frames begin the moment the section's top crosses 60% down the viewport —
          // the point where the hero + ticker are still visible above and the chapter
          // label is on screen (see the reference screenshot).
          start: "top 50%",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            if (!counterRef.current) return;
            // Same mapping as the cascade: frame n is fully visible at n/39 of CASCADE_END.
            const k = Math.min(
              FRAME_COUNT,
              Math.floor((self.progress / CASCADE_END) * (FRAME_COUNT - 1)) + 1
            );
            const text = String(k).padStart(2, "0");
            if (counterRef.current.textContent !== text) {
              counterRef.current.textContent = text;
            }
          },
        },
      });

      tl.fromTo(
        ".opening-bar-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 1 },
        0
      );

      frames.forEach((frame, i) => {
        if (i === 0) return;
        tl.to(frame, { opacity: 1, duration: step }, (i - 1) * step);
      });

      // Pad the timeline to a unit duration so scroll progress maps 1:1 to it —
      // otherwise the copy tweens extending past CASCADE_END would stretch the cascade.
      tl.to({}, { duration: 1 }, 0);

      // Cue fades out the moment scrubbing starts; copy fades in, then the CTA appears
      // once the section is fully in view with the door open. Both exit as the section leaves.
      tl.to("#opening-cue", { opacity: 0, duration: 0.05, ease: "none" }, 0.02)
        .fromTo(
          "#opening-copy",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.08
        )
        .fromTo(
          "#opening-cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0.52
        )
        .to(
          "#opening-copy",
          { opacity: 0, y: -16, duration: 0.1, ease: "power2.in" },
          0.9
        );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="opening"
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950"
    >
      {/* Stacked frames — all preloaded; later frames paint above earlier ones */}
      <div className="relative h-screen w-full">
        {Array.from({ length: FRAME_COUNT }, (_, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={`${FRAME_DIR}/ezgif-frame-${pad(i + 1)}.jpg`}
            alt=""
            loading="eager"
            decoding="async"
            className="opening-frame absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}

        {/* Legibility scrims */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-950/85 to-transparent"
        />

        {/* Chapter label */}
        <div className="absolute top-0 left-0 z-10 p-6 sm:p-10">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-cream/70 uppercase">
            <span className="inline-block h-px w-8 bg-gold/70" />
            01.5 — The Opening
          </p>
        </div>

        {/* Caption + progress bar + CTA */}
        <div
          id="opening-copy"
          className="absolute inset-x-0 bottom-0 z-10 p-6 pb-10 sm:p-10 sm:pb-12"
        >
          <h2 className="max-w-md font-serif text-2xl leading-snug font-semibold text-cream italic sm:text-3xl">
            The door rolls up at 12:30.
            <span className="mt-2 block font-mono text-[10px] tracking-[0.28em] text-cream/55 uppercase not-italic">
              Solar-powered trailer · Old Pier, Killybegs
            </span>
          </h2>

          <div className="mt-6 h-px w-full max-w-[280px] overflow-hidden bg-cream/20">
            <div className="opening-bar-fill h-full w-full origin-left bg-gold" />
          </div>

          {/* CTA — appears once the door is open and the section fills the screen */}
          <div id="opening-cta" className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="tel:+353892393094"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-red px-7 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
            >
              <Phone className="size-4" />
              Order Takeaway
            </a>
            <a
              href="#menu"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-cream/30 px-6 text-sm font-medium text-cream transition-all duration-300 hover:border-gold/70 hover:text-gold"
            >
              View Menu
              <span aria-hidden className="text-gold">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Frame counter — bottom right, tracks the scrub */}
        <div className="absolute right-0 bottom-0 z-10 p-6 sm:p-10">
          <p className="flex items-baseline gap-1.5 font-mono text-[11px] tracking-[0.24em] text-cream/70 uppercase">
            <span ref={counterRef} className="text-gold">
              01
            </span>
            <span className="text-cream/40">/ {FRAME_COUNT}</span>
          </p>
        </div>

        {/* Scroll cue — fades out as soon as the door starts opening */}
        {!reduceMotion && (
          <div
            id="opening-cue"
            className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 sm:bottom-28"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/40 p-1">
                <span className="opening-scroll-dot h-2 w-0.5 rounded-full bg-gold" />
              </span>
              <span className="font-mono text-[9px] tracking-[0.32em] text-cream/60 uppercase">
                Scroll to open
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
