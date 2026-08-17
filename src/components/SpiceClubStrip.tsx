"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";

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
      className="relative overflow-hidden border-y border-jacks/20 bg-maroon"
    >
      {/* Warm member-only glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,210,15,0.09),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-14 sm:px-6 lg:flex-row lg:justify-between lg:gap-14 lg:px-10 lg:py-16">
        {/* Copy */}
        <div className="max-w-xl text-center lg:text-left">
          <motion.p
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="font-mono text-[11px] tracking-[0.32em] text-jacks uppercase"
          >
            Jack&rsquo;s Burger UK · Spice Club
          </motion.p>

          <motion.h2
            initial={reduceMotion ? false : { y: 22, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-4 font-retro text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.04] tracking-wide text-cream uppercase"
          >
            Join the Spice Club
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { y: 16, opacity: 0 }}
            whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
            className="mt-3 text-sm leading-relaxed text-cream/65 sm:text-base"
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
          className="w-full max-w-md lg:max-w-sm"
        >
          {status === "done" ? (
            <div
              role="status"
              className="rounded-2xl border border-jacks/40 bg-jacks/10 px-6 py-5 text-center"
            >
              <p className="font-retro text-lg text-jacks">
                You&rsquo;re in! 🔥
              </p>
              <p className="mt-1 text-sm text-cream/70">
                Keep an eye on your inbox for the first drop of spice.
              </p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-2.5 sm:flex-row"
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
                  className="h-12 min-w-0 flex-1 rounded-full bg-cream px-5 font-mono text-sm text-ink placeholder:font-sans placeholder:text-ink/35 focus:ring-2 focus:ring-jacks focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-jacks px-7 text-sm font-semibold text-ink shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream"
                >
                  <Flame className="size-4" />
                  Join Free
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2.5 text-xs font-medium text-jacks">
                  Please enter a valid email address to join.
                </p>
              )}
              <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-cream/45 uppercase">
                Free to join · Unsubscribe anytime
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}