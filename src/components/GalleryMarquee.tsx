"use client";

import { useReducedMotion } from "framer-motion";
import NextImage from "next/image";

const shots = [
  {
    src: "/images/jacks_scroll01_transparent_v2.png",
    alt: "A Jack's smash burger stacked on the pass",
  },
  {
    src: "/images/jacks_scroll02_transparent_v2.png",
    alt: "Skin-on fries fresh from the fryer",
  },
  {
    src: "/images/jacks_scroll03_transparent_v2.png",
    alt: "The full spread — burgers, fries and rings",
  },
];

/** One full pass of the marquee — the three shots side by side. */
function Row() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {shots.map((s) => (
        <div
          key={s.src}
          className="h-40 overflow-visible rounded-2xl sm:h-52"
        >
          <NextImage
            src={s.src}
            alt={s.alt}
            width={1600}
            height={914}
            sizes="(max-width: 768px) 240px, 320px"
            className="h-full w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
          />
        </div>
      ))}
    </div>
  );
}

export default function GalleryMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-y border-navy-800/8 bg-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <p className="text-center font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase">
          Jack&rsquo;s Burger UK · The Gallery
        </p>
      </div>

      <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">
            {shots.map((s) => (
              <div key={s.src} className="h-40 sm:h-52">
                <NextImage
                  src={s.src}
                  alt={s.alt}
                  width={1600}
                  height={914}
                  sizes="(max-width: 768px) 240px, 320px"
                  className="h-full w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
            <Row />
            <Row />
            <Row />
          </div>
        )}
      </div>
    </section>
  );
}
