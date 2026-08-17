"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-navy-800/8 bg-white/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Brand lockup */}
        <a href="#hero" className="group flex items-center" onClick={() => setOpen(false)}>
          <span className="relative block h-8 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
            <NextImage
              src="/images/Logo_300.png"
              alt="Jack's Burger UK logo"
              width={300}
              height={144}
              sizes="120px"
              className="h-full w-auto object-contain"
            />
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-navy-800/60 transition-colors hover:text-navy-800"
            >
              {active === link.label && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-blue/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: desktop CTA + mobile menu button */}
        <div className="flex items-center gap-2">
          <Button className="hidden h-10 rounded-full bg-red px-5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red/25 transition-all hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30 sm:inline-flex">
            <Phone className="size-3.5" />
            Order Now
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-navy-800/15 bg-white text-navy-800 transition-colors hover:bg-navy-800/5 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-navy-800/8 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.25 }}
                  onClick={() => {
                    setActive(link.label);
                    setOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-base font-medium text-navy-800/80 transition-colors hover:bg-blue/5 hover:text-navy-800"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+440000000000"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red px-5 text-sm font-semibold text-white shadow-lg shadow-red/25"
              >
                <Phone className="size-4" />
                Order Now
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
