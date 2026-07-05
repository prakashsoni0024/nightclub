import ContactSection from "@/sections/contact/ContactSection";

export const metadata = {
  title: "Contact | D'Casa The Pub jabalpur",

  description:
    "Get in touch with D'Casa The Pub in Jabalpur. Find our location, opening hours, phone number, and reserve your table for an unforgettable gastropub and nightlife experience.",

  keywords: [
    "Contact D'Casa The Pub",
    "D'Casa The Pub Jabalpur",
    "Pub near Vijay Nagar Jabalpur",
    "Gastropub Jabalpur",
    "Bar in Jabalpur",
    "Table Reservation Jabalpur",
    "Pub Contact Number Jabalpur",
    "Nightlife Jabalpur",
    "Restaurant Contact Jabalpur",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact D'Casa The Pub | Jabalpur",

    description:
      "Visit D'Casa The Pub in Jabalpur. View our address, opening hours, contact details, and reserve your table online.",

    url: "/contact",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact D'Casa The Pub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact D'Casa The Pub",

    description:
      "Find the location, contact details, and opening hours of D'Casa The Pub in Jabalpur.",

    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="pt-10">
      <ContactSection />
    </main>
  );
}