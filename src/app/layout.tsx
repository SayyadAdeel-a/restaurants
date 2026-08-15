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
  keywords: [
    "Killybegs Seafood Shack",
    "seafood takeaway Donegal",
    "fish and chips Killybegs",
    "Wild Atlantic Way seafood",
    "Old Pier Killybegs",
    "All-Ireland Chowder Champion",
    "Anderson's Boathouse",
  ],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolage.variable, cormorant.variable, archivo.variable, plexMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
