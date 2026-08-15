"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import NextImage from "next/image";
import { Phone, AtSign, MapPin } from "lucide-react";

const SALT_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.35;
  return {
    x: Math.cos(angle) * (34 + Math.random() * 46),
    y: Math.sin(angle) * (30 + Math.random() * 40),
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.06,
  };
});

export default function FooterSection() {
  const [burst, setBurst] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleOrder = () => {
    if (reduceMotion) return;
    setBurst(true);
  };

  return (
    <footer
      id="footer"
      className="grain relative overflow-hidden bg-navy-950 py-24 lg:py-32"
    >
      {/* Tiny floating cod bites — 5% opacity, bottom-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[4%] bottom-[6%] z-0 w-40 opacity-5 sm:w-52"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 4, 0] }}
        transition={reduceMotion ? undefined : { repeat: Infinity, duration: 9, ease: "easeInOut" }}
      >
        <NextImage
          src="/images/dish/bento_cod_bites.webp"
          alt=""
          width={360}
          height={240}
          className="w-full object-contain"
        />
      </motion.div>

      {/* Soft glow behind the CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
        {/* Small tagline */}
        <p className="font-serif text-xl text-cream/70 italic sm:text-2xl">
          Fresh from the <em className="text-blue">Boats</em> to Your Plate
        </p>
        <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.28em] text-cream/45 uppercase">
          <MapPin className="size-3 text-blue" />
          Shore Road · Old Pier, Killybegs
        </p>

        {/* Big CTA — salt burst on click */}
        <div className="relative mt-10">
          <AnimatePresence>
            {burst && (
              <motion.div
                key="salt-burst"
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20"
              >
                {SALT_PARTICLES.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full bg-cream"
                    style={{ width: p.size, height: p.size }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [1, 1, 0],
                      scale: [0.6, 1.4, 0.8],
                    }}
                    transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
                    onAnimationComplete={i === 0 ? () => setBurst(false) : undefined}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="tel:+353892393094"
            onClick={handleOrder}
            className="relative inline-flex h-16 items-center gap-3 rounded-full bg-red px-10 text-lg font-semibold text-white shadow-2xl shadow-red/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-red/40 active:translate-y-0 sm:px-12"
          >
            <Phone className="size-5" />
            Order Takeaway
            <span className="font-mono text-sm font-normal text-white/70">
              +353 89 239 3094
            </span>
          </a>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/killybegsseafoodshack/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm tracking-[0.14em] text-cream/70 transition-colors hover:text-cream"
        >
          <AtSign className="size-4" />
          @killybegsseafoodshack
        </a>

        {/* SEO line */}
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-cream/40">
          Wild Atlantic Way seafood on the Old Pier, Donegal. Solar-powered,
          flower-bedecked takeaway. 12:30–19:30.
        </p>

        {/* Bottom row */}
        <div className="mt-12 flex w-full flex-col items-center gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:justify-between">
          <span className="flex items-center gap-2.5">
            <span className="relative block size-8 overflow-hidden rounded-full bg-white">
              <NextImage
                src="/images/logo.jpg"
                alt="Killybegs Seafood Shack logo"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-serif text-sm text-cream/60 italic">
              Killybegs Seafood Shack
            </span>
          </span>
          <span className="font-mono text-[9px] tracking-[0.24em] text-cream/35 uppercase">
            Anderson Hospitality Group · Est. 2017
          </span>
        </div>
      </div>
    </footer>
  );
}
