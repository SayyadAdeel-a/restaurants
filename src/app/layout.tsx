import type { Metadata } from "next";
import { Alfa_Slab_One, IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const alfaSlab = Alfa_Slab_One({
  variable: "--font-alfa",
  weight: "400",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const SITE_URL = "https://jacksburgeruk.com";
const TITLE = "Jack's Burger UK | Where Passion Meets Flavour";
const DESCRIPTION =
  "Where passion meets flavour — and maybe a little sauce on your chin. Flame-grilled smash burgers made with top-quality ingredients, served fast from Jack's Burger in North Wales.";

const OG_IMAGE = {
  url: "/images/jacks_scroll01_transparent_v2.png",
  width: 1600,
  height: 1066,
  alt: "Jack's Burger UK — the signature flame-grilled smash burger",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Jack's Burger UK",
  category: "food",
  keywords: [
    "Jack's Burger UK",
    "British beef burgers",
    "flame-grilled burgers",
    "best burger UK",
    "smash burger",
    "chicken burger",
    "burger takeaway UK",
    "burgers made to order",
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
    siteName: "Jack's Burger UK",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [OG_IMAGE],
    locale: "en_GB",
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
      "@type": "FastFoodRestaurant",
      "@id": `${SITE_URL}/#restaurant`,
      name: "Jack's Burger UK",
      description:
        "Flame-grilled 100% British beef burgers, made to order. Fresh brioche, melted cheddar and house sauces — served fast from our high-street kitchens across the UK.",
      url: SITE_URL,
      image: `${SITE_URL}/images/jacks_smash_burger_cutout.png`,
      telephone: "+441248666800",
      priceRange: "£",
      servesCuisine: ["Burgers", "Fast Food", "British"],
      acceptsReservations: "False",
      hasMap: "https://www.google.com/maps/search/?api=1&query=Llangefni+Road+Brynteg",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Llangefni Road",
        addressLocality: "Brynteg",
        postalCode: "LL78 8JQ",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.3142,
        longitude: -4.3457,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
          ],
          opens: "11:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Friday", "Saturday"],
          opens: "11:00",
          closes: "00:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "1000",
      },
      sameAs: [
        "https://www.facebook.com/",
        "https://instagram.com/jacksburgeruk",
        "https://www.tiktok.com/",
      ],
      hasMenu: {
        "@type": "Menu",
        name: "Jack's Burger UK Bestsellers",
        hasMenuSection: {
          "@type": "MenuSection",
          name: "Bestsellers",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "The Smash Burger",
              description:
                "Double flame-grilled British beef, melted cheddar and house sauce.",
              offers: {
                "@type": "Offer",
                price: "8.50",
                priceCurrency: "GBP",
              },
            },
            {
              "@type": "MenuItem",
              name: "The Chicken Burger",
              description:
                "Buttermilk-fried chicken, crunchy slaw and hot honey mayo.",
              offers: {
                "@type": "Offer",
                price: "8.95",
                priceCurrency: "GBP",
              },
            },
            {
              "@type": "MenuItem",
              name: "The Fries",
              description:
                "Skin-on, double-cooked with Jack's signature seasoning.",
              offers: {
                "@type": "Offer",
                price: "3.50",
                priceCurrency: "GBP",
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
          name: "Is Jack's Burger UK takeaway only?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — dine in, take away or get it delivered. Order ahead to skip the queue.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Jack's Burger UK?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Llangefni Road, Brynteg, LL78 8JQ — with more sites opening soon across the UK.",
          },
        },
        {
          "@type": "Question",
          name: "What are Jack's Burger UK opening hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Open Sun–Thu 11am–11pm and Fri–Sat 11am–midnight.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best thing to order at Jack's Burger UK?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Smash Burger — double flame-grilled British beef with melted cheddar and Jack's house sauce.",
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
      className={cn("h-full", "antialiased", poppins.variable, alfaSlab.variable, plexMono.variable, "font-sans")}
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
