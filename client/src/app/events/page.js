import EventsSection from "@/sections/events/EventsSection";

export const metadata = {
  title: "Events | D'Casa The Pub Jabalpur",

  description:
    "Explore upcoming live DJ nights, themed parties, weekend events, and exclusive nightlife experiences at D'Casa The Pub in Jabalpur. Reserve your table online.",

  keywords: [
    "events in Jabalpur",
    "live DJ Jabalpur",
    "DJ night Jabalpur",
    "weekend party Jabalpur",
    "pub events Jabalpur",
    "nightlife Jabalpur",
    "D'Casa events",
    "party venue Jabalpur",
    "table booking Jabalpur",
    "gastropub events",
  ],

  alternates: {
    canonical: "/events",
  },

  openGraph: {
    title: "Events & Live DJ Nights | D'Casa The Pub",

    description:
      "Discover live DJ nights, themed parties, and exciting events at D'Casa The Pub, Jabalpur.",

    url: "/events",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'Casa The Pub Events",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Events & Live DJ Nights | D'Casa The Pub",

    description:
      "Stay updated with upcoming events and live DJ nights at D'Casa The Pub.",

    images: ["/og-image.jpg"],
  },
};

export default function EventPage() {
  return (
    <main className="pt-10">
      <EventsSection />
    </main>
  );
}