"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "Heritage", href: "#heritage" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-navy-800/8 bg-cream/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Brand lockup */}
        <a href="#hero" className="group flex items-center gap-3">
          <span className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-1 ring-navy-100 transition-transform duration-300 group-hover:scale-105">
            <NextImage
              src="/images/logo.jpg"
              alt="Killybegs Seafood Shack logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-lg font-semibold tracking-tight text-navy-800">
              Killybegs <em className="text-blue italic">Seafood Shack</em>
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-navy-800/50 uppercase">
              Old Pier · Donegal
            </span>
          </span>
        </a>

        {/* Links */}
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
                  className="absolute inset-0 rounded-full bg-navy-800/8"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Button className="h-10 rounded-full bg-red px-5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-red/25 transition-all hover:-translate-y-0.5 hover:bg-crimson hover:shadow-xl hover:shadow-red/30">
          <Phone className="size-3.5" />
          Order Takeaway
        </Button>
      </div>
    </motion.header>
  );
}
