import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Bebas_Neue, Sora } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";

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
  weight: ["400"],
  variable: "--font-bebas",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Nightclub",
  description: "Modern Nightclub Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable} ${bebas.variable} ${sora.variable}`}>
    
            <Navbar />

        <main className="pt-24 min-h-screen">
          {children}
        </main>

        <Footer />
     
      </body>
    </html>
  );
}