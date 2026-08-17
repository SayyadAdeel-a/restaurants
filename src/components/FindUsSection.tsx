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
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHONE = "01248 666800";
const PHONE_HREF = "tel:+441248666800";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Llangefni+Road+Brynteg+LL78+8JQ";
const EMAIL = "info@jacksburgeruk.com";
const EMAIL_HREF = "mailto:info@jacksburgeruk.com";

/* ---------- Section ---------- */

export default function FindUsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { margin: "200px 0px" });

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-[#FFD60A] py-16 lg:py-[120px]"
    >
      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-16 px-5 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-[120px]">
        {/* Left — copy & blocks */}
        <div className="order-2 lg:order-1 max-w-xl w-full">
          <h2
            id="find-title"

            className="mt-6 text-[36px] md:text-[48px] leading-[0.95] font-black tracking-[-0.03em] text-[#0A0A0A]"
          >
            Hot off the Grill. <span className="text-[#E10613]">Come Hungry.</span>
          </h2>

          {/* Maroon location blocks — the real Jack's Burger spots */}
          <motion.div
            id="find-address"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            className="mt-8 overflow-hidden rounded-[16px] bg-[#2B0A0A] p-6 shadow-soft"
          >
            <div className="grid gap-6 sm:grid-cols-2 text-left">
              {/* Location */}
              <div>
                <p className="font-bold text-[14px] text-[#FFFFFF] uppercase">
                  JACK&rsquo;S BURGER
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/80">
                  Llangefni Road, Brynteg
                  <br />
                  LL78 8JQ · North Wales
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.1em] text-[#FFD60A] uppercase transition-colors hover:text-[#FFFFFF]"
                >
                  <Navigation className="size-3" />
                  Get Directions
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="flex items-center gap-1.5 font-bold text-[10px] tracking-[0.2em] text-[#FFD60A] uppercase">
                  <Clock className="size-3.5" />
                  WORKING HOURS
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#FFFFFF]/90">
                  Sun – Thu · 11am – 11pm
                  <br />
                  Fri – Sat · 11am – Midnight
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="flex items-center gap-1.5 font-bold text-[10px] tracking-[0.2em] text-[#FFD60A] uppercase">
                  <Phone className="size-3.5" />
                  CALL US
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-2 inline-block text-[14px] font-bold text-[#FFFFFF] transition-colors hover:text-[#FFD60A]"
                >
                  {PHONE}
                </a>
                <p className="mt-1 text-[11px] text-[#FFFFFF]/60">
                  Dine-in, takeaway &amp; delivery
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="flex items-center gap-1.5 font-bold text-[10px] tracking-[0.2em] text-[#FFD60A] uppercase">
                  <Mail className="size-3.5" />
                  GOT A QUESTION?
                </p>
                <a
                  href={EMAIL_HREF}
                  className="mt-2 inline-block text-[12px] font-bold break-all text-[#FFFFFF] transition-colors hover:text-[#FFD60A]"
                >
                  {EMAIL}
                </a>
                <p className="mt-1 text-[11px] text-[#FFFFFF]/60">
                  Or find us on Instagram{" "}
                  <a
                    href="https://instagram.com/jacksburgeruk"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#FFD60A] transition-colors hover:text-[#FFFFFF]"
                  >
                    @jacksburgeruk
                  </a>
                </p>
              </div>
            </div>

            {/* Branches strip — the real Jack's Burger sites */}
            <div className="mt-6 pt-4 border-t border-[#FFFFFF]/10 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="font-bold text-[10px] tracking-[0.2em] text-[#FFD60A] uppercase">
                BANGOR • PENRHYN BAY • ABERSOCH
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col md:flex-row items-center gap-3">
              <a
                href={PHONE_HREF}
                className="w-full md:w-auto inline-flex justify-center h-10 items-center gap-2 rounded-full bg-[#E10613] px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                Order Now
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto flex justify-center items-center h-10 rounded-full border-2 border-[#FFFFFF] px-6 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#FFFFFF] hover:text-[#0A0A0A]"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — the chicken burger as a floating plate */}
        <div className="order-1 lg:order-2 mx-auto w-full max-w-[320px] lg:max-w-[480px]">
          <motion.div style={reduceMotion ? undefined : { y: photoY }}>
            <motion.div
              initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
            <motion.div
              id="find-photo-inner"
              ref={photoRef}
              className="relative will-change-transform"
              animate={
                reduceMotion || !photoInView ? undefined : { y: [0, -12, 0] }
              }
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              {/* Soft yellow glow */}
              <div className="absolute inset-0 bg-[#FFD60A] blur-3xl rounded-full scale-110 opacity-50"></div>

              {/* Floating plate — circular crop like a serving plate */}
              <div className="relative overflow-hidden rounded-full border-8 border-white shadow-soft">
                <NextImage
                  src="/images/jacks_scroll03_transparent_v2.png"
                  alt="The full Jack's spread — burgers, fries and rings"
                  width={480}
                  height={480}
                  sizes="(max-width: 1024px) 320px, 480px"
                  className="aspect-square h-auto w-full object-cover"
                />
              </div>

              {/* Map pin — absolute positioning top */}
              <motion.div
                className="absolute left-[30%] md:left-[25%] top-[10%]"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              >
                <div className="relative">
                  <span className="block size-8 md:size-10 rounded-full bg-[#E10613] shadow-soft ring-4 ring-white" />
                  <MapPin className="absolute inset-0 m-auto size-4 md:size-5 text-white" />
                </div>
              </motion.div>

              {/* You-are-here label */}
              <div className="absolute bottom-[-10%] md:bottom-[0%] right-[10%] md:right-[0%]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 py-2 font-bold text-[10px] tracking-[0.2em] text-[#FFD60A] uppercase shadow-soft">
                  <span className="size-1.5 rounded-full bg-[#E10613]" />
                  JACK&rsquo;S • BRYNTEG
                </span>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
