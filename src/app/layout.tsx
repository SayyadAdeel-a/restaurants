import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, Cormorant_Garamond, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const SITE_URL = "https://killybegsseafoodshack.ie";
const TITLE = "Killybegs Seafood Shack | Award-Winning Seafood on the Old Pier, Donegal";
const DESCRIPTION =
  "Taste Ireland's #1 Seafood Chowder and pier-fresh fish & chips at the Killybegs Seafood Shack on the Wild Atlantic Way. Crafted by Chef Garry Anderson.";

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Killybegs Seafood Shack — award-winning seafood on the Old Pier, Donegal",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Killybegs Seafood Shack",
  authors: [{ name: "Garry Anderson" }, { name: "Mairéad Anderson" }],
  creator: "Anderson Hospitality Group",
  publisher: "Anderson Hospitality Group",
  category: "food",
  keywords: [
    "Killybegs Seafood Shack",
    "seafood takeaway Donegal",
    "fish and chips Killybegs",
    "Wild Atlantic Way seafood",
    "Old Pier Killybegs",
    "All-Ireland Chowder Champion",
    "Anderson's Boathouse",
    "Killybegs chowder",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Killybegs Seafood Shack",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [OG_IMAGE],
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/* ---------- JSON-LD structured data (Restaurant + Menu + FAQ) ---------- */

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#restaurant`,
      name: "The Killybegs Seafood Shack",
      alternateName: "Killybegs Seafood Shack",
      description:
        "Pier-side gourmet seafood takeaway on the Old Pier, Killybegs — award-winning chowder and pier-fresh fish & chips, crafted daily by Chef Garry Anderson.",
      url: SITE_URL,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+353892393094",
      priceRange: "€€",
      servesCuisine: ["Seafood", "Fish and Chips", "Irish"],
      acceptsReservations: "False",
      hasMap: "https://maps.google.com/?cid=12648710332822452345",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shore Road, Old Pier",
        addressLocality: "Killybegs",
        addressRegion: "County Donegal",
        postalCode: "F94 WF5X",
        addressCountry: "IE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 54.6365,
        longitude: -8.4051,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:30",
          closes: "20:00",
        },
      ],
      founder: [
        { "@type": "Person", name: "Garry Anderson" },
        { "@type": "Person", name: "Mairéad Anderson" },
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "Anderson Hospitality Group",
      },
      award: "All-Ireland Seafood Chowder Champion 2019 & 2020",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "1000",
      },
      sameAs: [
        "https://www.facebook.com/killybegsseafoodshack/",
        "https://instagram.com/killybegsseafoodshack",
        "https://www.tripadvisor.com/Restaurant_Review-g211874-d12519106-Reviews-Killybegs_Seafood_Shack-Killybegs_County_Donegal.html",
        "https://dishcult.com/restaurant/andersonsboathouse",
      ],
      hasMenu: {
        "@type": "Menu",
        name: "Killybegs Seafood Shack Bestsellers",
        hasMenuSection: {
          "@type": "MenuSection",
          name: "Bestsellers",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "The Sharing Box",
              description:
                "Smoked haddock, goujons, scampi & calamari with skin-on fries.",
              offers: {
                "@type": "Offer",
                price: "14.00",
                priceCurrency: "EUR",
              },
            },
            {
              "@type": "MenuItem",
              name: "The Award-Winning Chowder",
              description:
                "Smoked haddock, wild salmon & Donegal blue mussels in a creamy base, with Irish soda bread.",
              offers: {
                "@type": "Offer",
                price: "8.50",
                priceCurrency: "EUR",
              },
            },
            {
              "@type": "MenuItem",
              name: "Fish & Chips",
              description:
                "Hand-battered cod with triple-cooked chips and mushy peas.",
              offers: {
                "@type": "Offer",
                price: "9.50",
                priceCurrency: "EUR",
              },
            },
          ],
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the Killybegs Seafood Shack takeaway only?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — the Killybegs Seafood Shack is a pier-side gourmet seafood takeaway on the Old Pier, Killybegs. No booking needed, just join the queue on the pier.",
          },
        },
        {
          "@type": "Question",
          name: "Where is the Killybegs Seafood Shack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On Shore Road at the Old Pier, Killybegs, County Donegal, Ireland — right beside the fishing harbour on the Wild Atlantic Way.",
          },
        },
        {
          "@type": "Question",
          name: "What are the Killybegs Seafood Shack opening hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The shack is open daily from 11:30 to 8pm for takeaway.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best thing to order at the Killybegs Seafood Shack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The award-winning seafood chowder — All-Ireland Chowder Champion 2019 & 2020 — packed with smoked haddock, wild salmon and Donegal blue mussels.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolage.variable, cormorant.variable, archivo.variable, plexMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
