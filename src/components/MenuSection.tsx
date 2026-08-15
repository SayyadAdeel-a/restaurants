"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { Fish } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ---------- Salt dust ---------- */

const SALT_GRAINS = [
  { left: 12, delay: 0, dur: 1.2 },
  { left: 24, delay: 0.12, dur: 1.05 },
  { left: 36, delay: 0.04, dur: 1.3 },
  { left: 48, delay: 0.18, dur: 1.1 },
  { left: 60, delay: 0.08, dur: 1.25 },
  { left: 72, delay: 0.14, dur: 1.0 },
  { left: 84, delay: 0.02, dur: 1.15 },
  { left: 20, delay: 0.22, dur: 1.35 },
  { left: 55, delay: 0.1, dur: 0.95 },
  { left: 78, delay: 0.2, dur: 1.2 },
  { left: 30, delay: 0.26, dur: 1.05 },
  { left: 66, delay: 0.16, dur: 1.3 },
];

function SaltDust() {
  return (
    <div aria-hidden className="salt-dust">
      {SALT_GRAINS.map((g, i) => (
        <span
          key={i}
          style={{
            left: `${g.left}%`,
            ["--salt-delay" as string]: `${g.delay}s`,
            ["--salt-dur" as string]: `${g.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Tilt card (same feel as the hero garnish) ---------- */

function TiltCard({
  children,
  className = "",
  tilt = 6,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-tilt, tilt]), {
    stiffness: 140,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [tilt, -tilt]), {
    stiffness: 140,
    damping: 16,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className={`group relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Data ---------- */

type BentoCard = {
  img: string;
  alt: string;
  name: string;
  desc: string;
  price: string;
  tag: string;
  span?: string; // grid span classes
  salt?: boolean;
};

const cards: BentoCard[] = [
  {
    img: "/images/dish/bento_sharing_box.webp",
    alt: "Award-winning chowder and sharing seafood box",
    name: "The Sharing Box",
    desc: "Award-winning chowder plus smoked haddock, cod goujons, scampi, calamari and skin-on fries — pink & garlic mayo.",
    price: "€14",
    tag: "The Big One",
    span: "lg:col-span-2 lg:row-span-2",
    salt: true,
  },
  {
    img: "/images/dish/bento_cod_bites.webp",
    alt: "Beer-battered cod bites",
    name: "Cod Bites",
    desc: "Light, crispy and lovely chips.",
    price: "€12",
    tag: "Bestseller",
    salt: true,
  },
  {
    img: "/images/dish/bento_mixed.webp",
    alt: "Mixed fish box",
    name: "The Mixed Box",
    desc: "A bit of everything, fried perfectly.",
    price: "€14",
    tag: "Surf & Turf",
    salt: true,
  },
  {
    img: "/images/dish/bento_haddock.webp",
    alt: "Golden smoked haddock",
    name: "Smoked Haddock",
    desc: "Golden smoked haddock in light batter.",
    price: "€12.50",
    tag: "Smoked",
    salt: true,
  },
  {
    img: "/images/dish/bento_goujons.webp",
    alt: "Crispy cod goujons",
    name: "Cod Goujons",
    desc: "Tender goujons with hand-cut chips.",
    price: "€11.50",
    tag: "Kids' Fave",
    salt: true,
  },
  {
    img: "/images/dish/bento_seafood_2fish.webp",
    alt: "Two-fish seafood box",
    name: "Seafood Box — 2 Fish",
    desc: "Two fish, battered to order.",
    price: "€13.50",
    tag: "Two Fish",
    salt: true,
  },
];

function BentoItem({ card }: { card: BentoCard }) {
  return (
    <TiltCard className={card.span ?? ""}>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-[0_24px_50px_-18px_rgba(27,29,58,0.22)] transition-shadow duration-300 group-hover:shadow-[0_32px_70px_-18px_rgba(27,29,58,0.32)]">
        {/* Image on dark chalk panel — salt dust reads white on it */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-chalk lg:aspect-auto lg:min-h-52 lg:flex-1">
          <NextImage
            src={card.img}
            alt={card.alt}
            width={640}
            height={427}
            sizes="(max-width: 1024px) 90vw, (max-width: 1280px) 40vw, 380px"
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {card.salt && <SaltDust />}
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.26em] text-blue uppercase">
                {card.tag}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-navy-800">
                {card.name}
              </h3>
            </div>
            <span className="mt-1 shrink-0 rounded-full bg-red px-3 py-1 font-mono text-sm font-medium text-white shadow-md shadow-red/25">
              {card.price}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-navy-800/60">
            {card.desc}
          </p>
        </div>
      </article>
    </TiltCard>
  );
}

/* ---------- Section ---------- */

export default function MenuSection() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
      });
      tl.from("#menu-eyebrow", { y: 18, opacity: 0, duration: 0.6 }, 0)
        .from(
          "#menu-title .line-inner",
          { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" },
          0.15
        )
        .from(".bento-item", { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.4)
        .from("#menu-mayo", { y: 24, opacity: 0, duration: 0.8 }, 0.9);
    },
    { scope: rootRef }
  );

  return (
    <section
      id="menu"
      ref={rootRef}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Chapter header */}
        <div className="max-w-2xl">
          <p
            id="menu-eyebrow"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.32em] text-navy-800/50 uppercase"
          >
            <Fish className="size-3.5 text-blue" />
            01 — The Bestsellers
          </p>
          <h2
            id="menu-title"
            className="mt-6 font-serif text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-navy-800"
          >
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">Seven boxes.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="line-inner block">
                <em className="text-blue italic">Zero filler.</em>
              </span>
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-navy-800/60 sm:text-lg">
            The seven that built the queue on the pier — cooked to order,
            straight from the boat.
          </p>
        </div>

        {/* Bento grid — wooden fork cursor, cards tilt on hover */}
        <div className="bento-cursor mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.name} className="bento-item">
              <BentoItem card={card} />
            </div>
          ))}

          {/* Garlic mayo — wide sauce strip */}
          <div id="menu-mayo" className="sm:col-span-2 lg:col-span-3">
            <TiltCard tilt={3}>
              <div className="flex items-center gap-6 rounded-3xl border border-navy-100 bg-chalk p-5 shadow-[0_24px_50px_-18px_rgba(27,29,58,0.22)] sm:p-6">
                <div className="relative h-24 w-28 shrink-0 sm:h-28 sm:w-36">
                  <NextImage
                    src="/images/dish/bento_garlic_mayo.webp"
                    alt="House garlic mayonnaise"
                    fill
                    sizes="144px"
                    className="object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.3)]"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] tracking-[0.26em] text-cream/50 uppercase">
                    House Sauce
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-cream italic sm:text-2xl">
                    Garlic Mayo
                  </h3>
                  <p className="mt-1 text-sm text-cream/65">
                    Made fresh daily — on every box, on the side, or on everything.
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-gold/90 px-4 py-1.5 font-mono text-sm font-medium text-navy-950 sm:block">
                  €1.50
                </span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
