"use client";

import NextImage from "next/image";

const PHONE = "+44 0000 000000";
const PHONE_HREF = "tel:+440000000000";
const MAPS_URL = "https://maps.google.com/";

const links = [
  {
    label: "Instagram",
    href: "https://instagram.com/jacksburgeruk",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
  },
  {
    label: "Google Maps",
    href: MAPS_URL,
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
            <span className="relative block h-14 w-auto shrink-0">
              <NextImage
                src="/images/Logo_300.png"
                alt="Jack's Burger UK logo"
                width={300}
                height={144}
                sizes="112px"
                className="h-full w-auto object-contain"
              />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold tracking-tight">
                Jack&rsquo;s <em className="text-blue italic">Burger UK</em>
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.28em] text-cream/60 uppercase">
                Flame-Grilled British Beef
              </p>
            </div>
          </div>

          <a
            href={PHONE_HREF}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-red px-8 text-sm font-semibold text-white shadow-lg shadow-red/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson"
          >
            Order Now · {PHONE}
          </a>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-cream/10" />

        {/* Middle — links */}
        <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-md">
            <p className="font-mono text-[11px] tracking-[0.3em] text-cream/50 uppercase">
              Flame-Grilled · Made to Order
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              Flame-grilled 100% British beef burgers, made to order. Fresh
              brioche, melted cheddar and house sauces — served fast from our
              high-street kitchens across the UK.
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
                className="group font-mono text-xs tracking-[0.18em] text-cream/70 uppercase transition-colors hover:text-blue"
              >
                {link.label}
                <span className="mt-0.5 block h-px w-0 bg-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">
            © {new Date().getFullYear()} Jack&rsquo;s Burger UK · All rights
            reserved
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">
            <span className="size-1.5 rotate-45 bg-blue/60" />
            Flame-Grilled · Made to Order
          </p>
        </div>
      </div>
    </footer>
  );
}
