import HeroSection from "@/sections/hero/HeroSection";
import EventsSection from "@/sections/events/EventsSection";
import GallerySection from "@/sections/gallery/GallerySection";
import BookingSection from "@/sections/booking/BookingSection";
import ContactSection from "@/sections/contact/ContactSection";

export const metadata = {
  title: "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",
  description:
    "Visit D'Casa The Pub, Jabalpur's premium gastropub and nightlife destination. Enjoy live DJ nights, handcrafted cocktails, delicious food, weekend parties, and secure online table reservations in a vibrant atmosphere.",
  keywords: [
    "D'Casa The Pub",
    "gastropub in Jabalpur",
    "best gastropub in Jabalpur",
    "pub in Jabalpur",
    "best pub in Jabalpur",
    "bar in Jabalpur",
    "nightclub in Jabalpur",
    "cocktail bar Jabalpur",
    "live DJ Jabalpur",
    "DJ night Jabalpur",
    "weekend party Jabalpur",
    "table booking Jabalpur",
    "online table reservation",
    "birthday party venue Jabalpur",
    "corporate party venue",
    "food and drinks Jabalpur",
    "premium nightlife",
  ],
  alternates: {
    canonical: "https://dcasathepub.com",
  },
  openGraph: {
    title: "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",
    description:
      "Enjoy handcrafted cocktails, delicious food, live DJ nights, exciting events, and secure online table reservations at D'Casa The Pub.",
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
    title: "D'Casa The Pub | Premier Gastropub & Bar in Vijay Nagar, Jabalpur",
    description:
      "Enjoy handcrafted cocktails, delicious food, live DJ nights, exciting events, and secure online table reservations at D'Casa The Pub.",
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
