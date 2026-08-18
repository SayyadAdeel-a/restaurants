"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { ArrowRight, Phone, Star } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHONE_HREF = "tel:+441248666800";

/* ---------- Section ---------- */

export default function ReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const burgerInView = useInView(burgerRef, { margin: "200px 0px" });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  // Shared scroll progress for the parallax on the burger + edge scatters
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const burgerY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  /* The real promises from Jack's Burger — halal-certified, made to order */
  const chips = [
    "100% Halal-Certified",
    "Smashed to Order",
    "Famous Sweet Chili Fries",
  ];

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="relative overflow-hidden bg-jacks py-24 lg:py-36"
    >
      {/* Soft red glow behind the burger */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[28%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:px-10">
        {/* Left — the huge smash burger */}
        <div className="relative order-2 mx-auto w-[min(78vw,430px)] lg:order-1 lg:w-[min(40vw,520px)]">
          <motion.div style={reduceMotion ? undefined : { y: burgerY }}>
            <motion.div
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
              <motion.div
                id="rev-burger-inner"
                ref={burgerRef}
                className="relative will-change-transform"
                animate={
                  reduceMotion || !burgerInView ? undefined : { y: [0, -15, 0] }
                }
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <NextImage
                  src="/images/jacks_smash_burger_cutout.png"
                  alt="Jack's signature smash burger"
                  width={1600}
                  height={1600}
                  sizes="(max-width: 1024px) 78vw, 520px"
                  className="relative h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.18)]"
                />

                {/* Signature tag */}
                <span className="absolute -top-3 right-0 rotate-6 rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase shadow-lg shadow-gold/25">
                  ✦ Jack&rsquo;s Signature
                </span>

                {/* Cheese + fries drifting around the burger */}
                <motion.div
                  className="absolute -left-6 top-[14%] w-12 -rotate-12 sm:-left-10 sm:w-14 will-change-transform"
                  animate={
                    reduceMotion || !burgerInView ? undefined : { y: [0, -8, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                >
                  <NextImage
                    src="/images/burger_cheese.png"
                    alt=""
                    width={1920}
                    height={1280}
                    sizes="96px"
                    className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                  />
                </motion.div>
                <motion.div
                  className="absolute -right-4 bottom-[12%] w-16 rotate-12 sm:-right-8 sm:w-18 will-change-transform"
                  animate={
                    reduceMotion || !burgerInView ? undefined : { y: [0, 9, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 5.1, ease: "easeInOut" }}
                >
                  <NextImage
                    src="/images/burger_fries.png"
                    alt=""
                    width={1600}
                    height={1600}
                    sizes="96px"
                    className="h-auto w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — the real promise */}
        <div className="order-1 max-w-xl lg:order-2">
          <motion.p
            id="rev-eyebrow"
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="font-mono text-[11px] tracking-[0.32em] text-ink/60 uppercase"
          >
            Jack&rsquo;s Burger UK · The Promise
          </motion.p>

          <h2
            id="rev-title"
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
                The Name You Shout
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="line-inner block"
                initial={reduceMotion ? false : { y: 80 }}
                animate={reduceMotion ? undefined : titleInView ? { y: 0 } : { y: 80 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.37 }}
              >
                <em className="text-blue italic">When Cravings Hit.</em>
              </motion.span>
            </span>
          </h2>

          {/* Flame medallion + provenance line */}
          <div className="mt-5 flex items-center gap-2.5">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-blue/40">
              <NextImage
                src="/images/svg-2.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 object-contain"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-ink/65 uppercase">
              Flame-Grilled · Made to Order
            </span>
          </div>

          {/* Real promises — chips */}
          <motion.div
            id="rev-chips"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-2.5"
          >
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-ink uppercase"
              >
                <span aria-hidden className="size-1.5 rotate-45 bg-blue/70" />
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Real story quote */}
          <motion.blockquote
            id="rev-quote"
            initial={reduceMotion ? false : { y: 22, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="mt-8"
          >
            <p className="font-serif text-2xl leading-snug text-ink italic sm:text-[1.75rem]">
              &ldquo;We&rsquo;re the smashed burger rising star of North
              Wales&hellip; crafting tender &amp; juicy burgers with the
              freshest, high-quality ingredients.&rdquo;
            </p>
            <motion.footer
              id="rev-author"
              initial={reduceMotion ? false : { y: 12, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.95 }}
              className="mt-4 font-mono text-[11px] tracking-[0.26em] text-ink/60 uppercase"
            >
              — About Jack&rsquo;s Burger UK
            </motion.footer>
          </motion.blockquote>

          {/* Legacy callout */}
          <motion.div
            id="rev-legacy"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
            className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4"
          >
            <Star className="mt-0.5 size-5 shrink-0 fill-gold text-gold" />
            <p className="text-sm leading-relaxed text-ink/80">
              A shelf full of awards from our founder &amp; management&rsquo;s
              restaurant legacy.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            id="rev-cta"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
            >
              <Phone className="size-4" />
              Order Online
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink/20 px-7 text-sm font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-white"
            >
              Find a Jack&rsquo;s Near You
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
