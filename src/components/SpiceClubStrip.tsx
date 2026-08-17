"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ---------- Component — the Spice Club chapter banner ---------- */

export default function SpiceClubStrip() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  return (
    <section
      id="spice-club"
      className="relative overflow-hidden bg-[#2B0A0A] py-16"
    >
      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-2 items-center gap-8 px-5 sm:px-6 lg:px-[120px]">
        {/* Copy */}
        <div className="text-center md:text-left">
          <motion.h2
            initial={reduceMotion ? false : { y: 22, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-4 text-[36px] font-bold tracking-tight text-[#FFFFFF]"
          >
            Join the Spice Club
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
            className="mt-3 text-[12px] leading-relaxed text-[#808080]"
          >
            Member-only deals, secret menu drops &amp; free fries on your
            birthday — straight to your inbox. No spam, just spice.
          </motion.p>
        </div>

        {/* Email capture */}
        <motion.div
          initial={reduceMotion ? false : { y: 18, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
          className="w-full flex flex-col md:items-end justify-center"
        >
          {status === "done" ? (
            <div
              role="status"
              className="rounded-[16px] bg-[#3B0A0A] px-6 py-5 text-center w-full max-w-sm"
            >
              <p className="font-bold text-lg text-[#FFD60A]">
                You&rsquo;re in! 🔥
              </p>
              <p className="mt-1 text-[12px] text-[#FFFFFF]/70">
                Keep an eye on your inbox for the first drop of spice.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-sm">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-2.5 sm:flex-row w-full"
              >
                <label htmlFor="spice-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="spice-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                  className="h-12 min-w-0 flex-1 rounded-[12px] bg-[#FFFFFF] px-5 text-sm text-[#0A0A0A] placeholder:text-[#808080] focus:ring-2 focus:ring-[#FFD60A] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center rounded-[12px] bg-[#FFD60A] px-7 text-sm font-semibold text-[#0A0A0A] shadow-soft transition-all hover:bg-[#FFFFFF]"
                >
                  Join Free
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2.5 text-xs font-medium text-[#FFD60A]">
                  Please enter a valid email address to join.
                </p>
              )}
              <p className="mt-3 text-[10px] tracking-[0.2em] text-[#808080] uppercase">
                Free to join · Unsubscribe anytime
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}