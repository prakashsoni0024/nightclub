import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import {
  Bebas_Neue,
  Sora,
  Inter,
  Playfair_Display,
  Cinzel,
  Bodoni_Moda,
  Marcellus,
  Great_Vibes,
  Cormorant_Garamond,
} from "next/font/google";

import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cinzel",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bodoni",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  metadataBase: new URL(BUSINESS.domain),

  title: {
    default:
      "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",
    template: "%s | D'Casa The Pub",
  },

  description:
    "Experience D'Casa The Pub, Jabalpur's premier gastropub offering handcrafted cocktails, delicious cuisine, live DJ nights, vibrant nightlife, weekend events, and seamless online table reservations.",

  keywords: [
    "D'Casa The Pub",
    "gastropub in Jabalpur",
    "best gastropub in Jabalpur",
    "pub in Jabalpur",
    "best pub in Jabalpur",
    "nightclub in Jabalpur",
    "bar in Jabalpur",
    "cocktail bar Jabalpur",
    "restaurant and bar in Jabalpur",
    "live DJ Jabalpur",
    "DJ night Jabalpur",
    "weekend party Jabalpur",
    "party venue Jabalpur",
    "birthday party venue Jabalpur",
    "corporate party venue Jabalpur",
    "table booking Jabalpur",
    "online table reservation",
    "premium nightlife",
    "cocktails",
    "mocktails",
    "food and drinks",
    "fine dining Jabalpur",
    "late night dining",
    "music pub",
    "dance floor",
    "cocktail lounge Jabalpur",
    "live music Jabalpur",
    "nightlife in Jabalpur",
    "table reservation Jabalpur",
  ],

  authors: [
    {
      name: BUSINESS.name,
    },
  ],

  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Restaurant",
  applicationName: BUSINESS.name,
  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",

    description:
      "Experience D'Casa The Pub, Jabalpur's premier gastropub offering handcrafted cocktails, delicious cuisine, live DJ nights, vibrant nightlife, weekend events, and seamless online table reservations.",

    url: BUSINESS.domain,

    siteName: BUSINESS.name,

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: `${BUSINESS.domain}${BUSINESS.ogImage}`,
        width: 1200,
        height: 630,
        alt: "D'Casa The Pub - Premier Gastropub & Bar in Jabalpur",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",

    description:
      "Premium nightlife, live DJ, cocktails, events and online table booking in Jabalpur.",

    images: [`${BUSINESS.domain}${BUSINESS.ogImage}`],
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

  icons: {
    icon: BUSINESS.favicon,
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  appleWebApp: {
    capable: true,
    title: BUSINESS.name,
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#000000",
};

const structuredData = [localBusinessSchema, websiteSchema];

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${bebas.variable} ${sora.variable} ${cinzel.variable} ${greatVibes.variable} ${cormorant.variable} ${marcellus.variable} ${bodoni.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Navbar />

        <main className="pt-24 min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
