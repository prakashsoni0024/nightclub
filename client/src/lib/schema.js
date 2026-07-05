import { BUSINESS } from "@/lib/business";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "BarOrPub"],

  name: BUSINESS.name,

  url: BUSINESS.domain,

  image: `${BUSINESS.domain}${BUSINESS.ogImage}`,

  logo: `${BUSINESS.domain}${BUSINESS.favicon}`,

  telephone: BUSINESS.phone,

  description:
    "D'Casa The Pub is a premium gastropub in Jabalpur offering handcrafted cocktails, delicious food, live DJ nights, weekend parties, and secure online table reservations.",

 address: {
  "@type": "PostalAddress",

  streetAddress: BUSINESS.address,

  addressLocality: BUSINESS.city,

  addressRegion: BUSINESS.state,

  postalCode: BUSINESS.postalCode,

  addressCountry: "IN",
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
      opens: "18:00",
      closes: "23:30",
    },
  ],

  servesCuisine: [
    "Indian",
    "Chinese",
    "Continental",
    "Finger Food",
    "Beverages",
  ],

  priceRange: "₹₹",

  hasMap: BUSINESS.maps,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: BUSINESS.name,

  url: BUSINESS.domain,

  description:
    "Official website of D'Casa The Pub - Premium Gastropub, Bar & Nightlife Destination in Jabalpur.",

  inLanguage: "en-IN",

  publisher: {
    "@type": "Organization",
    name: BUSINESS.name,
  },
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",

  name: "Contact",

  url: "https://dcasathepub.com/contact",

  description:
    "Contact D'Casa The Pub for reservations, opening hours, directions, and customer support.",
};

export const galleryPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",

  name: "Gallery",

  url: "https://dcasathepub.com/gallery",

  description:
    "Gallery showcasing the interiors, food, cocktails, events, and nightlife at D'Casa The Pub in Jabalpur.",
};

export const bookingPageSchema = {
  "@context": "https://schema.org",

  "@type": "ReservationPage",

  name: "Book a Table",

  url: "https://dcasathepub.com/booking",

  description:
    "Reserve your table online at D'Casa The Pub in Jabalpur for live DJ nights, cocktails, food, and exclusive events.",
};