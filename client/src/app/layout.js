import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import {
  Bebas_Neue,
  Sora,
  Inter,
  Playfair_Display,
  Cinzel,
  Great_Vibes,
} from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cinzel",
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
  metadataBase: new URL("https://D'Casathepub.com"),

  title: {
    default: "D'Casa The Pub",
    template: "%s | D'Casa The Pub",
  },

  description:
    "Experience premium nightlife at D'Casa The Pub in Jabalpur. Enjoy live DJ nights, signature cocktails, delicious food, exciting events, and secure online table booking.",

  keywords: [
    "D'Casa The Pub",
    "Best Pub in Jabalpur",
    "Best Nightclub in Jabalpur",
    "Pub in Jabalpur",
    "Nightclub Jabalpur",
    "Live DJ Jabalpur",
    "Weekend Party Jabalpur",
    "Table Booking Jabalpur",
    "VIP Lounge Jabalpur",
    "Cocktails Jabalpur",
  ],

  authors: [
    {
      name: "D'Casa The Pub",
    },
  ],

  creator: "D'Casa The Pub",

  publisher: "D'Casa The Pub",

  alternates: {
    canonical: "https://D'Casathepub.com",
  },

  openGraph: {
    title: "D'Casa The Pub | Best Pub & Nightclub in Jabalpur",

    description:
      "Experience premium nightlife with live DJs, premium food, cocktails, exciting events and online table booking.",

    url: "https://D'Casathepub.com",

    siteName: "D'Casa The Pub",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'Casa The Pub - Best Pub & Nightclub in Jabalpur",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "D'Casa The Pub | Best Pub & Nightclub in Jabalpur",

    description:
      "Premium nightlife, live DJ, cocktails, events and online table booking in Jabalpur.",

    images: ["/og-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${bebas.variable} ${sora.variable} ${cinzel.variable} ${greatVibes.variable}`}
      >
        <Navbar />

        <main className="pt-24 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}