"use client";

import NextImage from "next/image";

const PHONE_HREF = "tel:+441248666800";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "FACEBOOK", href: "#" },
  { label: "TIKTOK", href: "#" },
  { label: "GOOGLE MAPS", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#111111] py-16">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-[120px]">
        {/* Top — brand + nav + CTA */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex justify-center md:justify-start">
            <span className="relative block h-10 w-auto shrink-0">
              <NextImage
                src="/images/Logo_300.png"
                alt="Jack's Burger UK logo"
                width={300}
                height={144}
                sizes="112px"
                className="h-full w-auto object-contain"
              />
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-bold text-[#808080] uppercase transition-colors hover:text-[#FFFFFF]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center md:justify-end">
            <a
              href={PHONE_HREF}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#E10613] px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              Order Now
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-[#FFFFFF]/10" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-md text-center md:text-left">
            <p className="text-[11px] leading-relaxed text-[#808080]">
              Flame-grilled 100% British beef burgers, made to order. Fresh
              brioche, melted cheddar and house sauces — served fast from our
              high-street kitchens across the UK.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4 text-[#888888] text-[10px] tracking-[0.05em] uppercase font-bold">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] text-[#808080] uppercase text-center">
              © {new Date().getFullYear()} Jack&rsquo;s Burger UK. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
