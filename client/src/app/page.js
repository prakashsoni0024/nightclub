import HeroSection from "@/sections/hero/HeroSection";
import EventsSection from "@/sections/events/EventsSection";
import GallerySection from "@/sections/gallery/GallerySection";
import BookingSection from "@/sections/booking/BookingSection";
import ContactSection from "@/sections/contact/ContactSection";

export const metadata = {
  title: "D'Casa The Pub",
  description:
    "Experience the ultimate nightlife at D'Casa The Pub in Jabalpur. Enjoy live DJ nights, exciting events, premium drinks, delicious food, and easy online table booking.",
  keywords: [
    "D'Casa The Pub",
    "Best Pub in Jabalpur",
    "Best Nightclub in Jabalpur",
    "Pub in Jabalpur",
    "Nightclub Jabalpur",
    "Live DJ Jabalpur",
    "Table Booking Jabalpur",
    "Weekend Party Jabalpur",
    "Party Place Jabalpur",
    "Cocktails Jabalpur",
  ],
  alternates: {
    canonical: "https://dcasathepub.com",
  },
  openGraph: {
    title: "D'Casa The Pub | Best Pub & Nightclub in Jabalpur",
    description:
      "Experience premium nightlife with live DJs, exciting events, delicious food, and easy table booking in Jabalpur.",
    url: "https://dcasathepub.com",
    siteName: "D'Casa The Pub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'Casa The Pub Jabalpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D'Casa The Pub | Best Pub & Nightclub in Jabalpur",
    description:
      "Live DJ nights, premium drinks, events, food, and online table booking at D'Casa The Pub, Jabalpur.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <GallerySection />
      <BookingSection />
      <ContactSection />
    </>
  );
}