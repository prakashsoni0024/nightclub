import BookingSection from "@/sections/booking/BookingSection";

export const metadata = {
  title: "Book a Table | D'Casa The Pub Jabalpur",

  description:
    "Reserve your table online at D'Casa The Pub in Jabalpur. Book for live DJ nights, birthday celebrations, corporate parties, weekend events, and premium gastropub experiences.",

  keywords: [
    "table booking Jabalpur",
    "book table Jabalpur",
    "online table reservation",
    "D'Casa table booking",
    "pub table booking Jabalpur",
    "gastropub reservation",
    "birthday party booking Jabalpur",
    "corporate party booking Jabalpur",
    "VIP table booking",
    "weekend party reservation",
    "nightclub reservation Jabalpur",
    "restaurant reservation Jabalpur",
  ],

  alternates: {
    canonical: "/booking",
  },

  openGraph: {
    title: "Book a Table | D'Casa The Pub",

    description:
      "Reserve your table online for live DJ nights, delicious food, handcrafted cocktails, and unforgettable nightlife experiences at D'Casa The Pub.",

    url: "/booking",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book a Table at D'Casa The Pub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Book a Table | D'Casa The Pub",

    description:
      "Reserve your table online and enjoy the finest gastropub and nightlife experience in Jabalpur.",

    images: ["/og-image.jpg"],
  },
};

export default function BookingPage() {
  return (
    <main className="pt-10">
      <BookingSection />
    </main>
  );
}