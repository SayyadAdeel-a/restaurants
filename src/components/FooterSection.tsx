"use client";

import NextImage from "next/image";

const PHONE = "+353 89 239 3094";
const PHONE_HREF = "tel:+353892393094";
const MAPS_URL = "https://maps.google.com/?cid=12648710332822452345";

const links = [
  {
    label: "Instagram",
    href: "https://instagram.com/killybegsseafoodshack",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/killybegsseafoodshack/",
  },
  {
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/Restaurant_Review-g211874-d12519106-Reviews-Killybegs_Seafood_Shack-Killybegs_County_Donegal.html",
  },
  {
    label: "Google Maps",
    href: MAPS_URL,
  },
  {
    label: "Anderson's Boathouse",
    href: "https://dishcult.com/restaurant/andersonsboathouse",
  },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 py-20 text-cream">
      {/* Faint rope-ring motif in the corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border border-cream/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full border border-cream/5"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Top — brand + CTA */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className="relative block size-14 shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-2 ring-gold/40">
              <NextImage
                src="/images/logo.jpg"
                alt="Killybegs Seafood Shack logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold tracking-tight">
                Killybegs <em className="text-blue italic">Seafood Shack</em>
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.28em] text-cream/60 uppercase">
                Fresh from the Boats to Your Plate
              </p>
            </div>
          </div>

          <a
            href={PHONE_HREF}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson"
          >
            Order Takeaway · {PHONE}
          </a>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-cream/10" />

        {/* Middle — links */}
        <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-md">
            <p className="font-mono text-[11px] tracking-[0.3em] text-cream/50 uppercase">
              Old Pier · Shore Road
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Wild Atlantic Way seafood on the Old Pier, Donegal. Solar-powered,
              flower-bedecked takeaway, open 11:30–8pm daily. All-Ireland
              Chowder Champions 2019 &amp; 2020.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noreferrer" : undefined
                }
                className="group font-mono text-xs tracking-[0.18em] text-cream/70 uppercase transition-colors hover:text-gold"
              >
                {link.label}
                <span className="mt-0.5 block h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">
            © {new Date().getFullYear()} The Killybegs Seafood Shack ·
            Anderson Hospitality Group
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">
            <span className="size-1.5 rotate-45 bg-gold/60" />
            Killybegs, Donegal · Wild Atlantic Way
          </p>
        </div>
      </div>
    </footer>
  );
}
