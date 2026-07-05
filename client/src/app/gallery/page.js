import GallerySection from "@/sections/gallery/GallerySection";

export const metadata = {
  title: "Gallery | D'Casa The Pub Jabalpur",

  description:
    "Explore the gallery of D'Casa The Pub in Jabalpur. Discover our premium interiors, handcrafted cocktails, delicious food, live DJ nights, vibrant events, and unforgettable nightlife experiences.",

  keywords: [
    "D'Casa The Pub gallery",
    "Pub photos Jabalpur",
    "Gastropub Jabalpur",
    "Bar photos Jabalpur",
    "Nightlife Jabalpur",
    "Live DJ Jabalpur",
    "Restaurant gallery Jabalpur",
    "Cocktail bar Jabalpur",
    "Party venue photos",
    "Weekend party Jabalpur",
  ],

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title: "Gallery | D'Casa The Pub",

    description:
      "Take a look inside D'Casa The Pub. Browse photos of our food, drinks, interiors, live DJ nights, and memorable events in Jabalpur.",

    url: "/gallery",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D'Casa The Pub Gallery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Gallery | D'Casa The Pub",

    description:
      "Explore the atmosphere, food, cocktails, and nightlife at D'Casa The Pub.",

    images: ["/og-image.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <main className="pt-10">
      <GallerySection />
    </main>
  );
}