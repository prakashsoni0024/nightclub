import Link from "next/link";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Book Table", href: "/booking" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "About Us", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Refund Policy", href: "/refund-cancellation" },
  { name: "Booking Policy", href: "/booking-policy" },
  { name: "FAQ", href: "/faq" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[180px]" />

      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Main Footer */}

        <div className="grid gap-10 md:gap-12 border-t border-white/10 py-10 md:py-12 lg:grid-cols-[1.3fr_1fr]">

          {/* Brand */}

          <div>

            <Link
              href="/"
              className="
              font-[family:var(--font-great-vibes)]
              text-4xl md:text-5xl
              bg-gradient-to-r
              from-pink-500
              via-purple-400
              to-cyan-400
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_18px_rgba(192,132,252,0.35)]
            "
            >
              D'Casa
            </Link>

            <p className="mt-4 max-w-lg leading-7 text-white/60">
              Where every night becomes a story.
              Experience luxury nightlife, exclusive events,
              premium hospitality and unforgettable moments.
            </p>

            <div className="mt-6 flex gap-4">

              <Link
                href="https://www.instagram.com/dcasapub/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400"
              >
                <FaInstagram />
              </Link>

              <Link
                href="https://www.facebook.com/dcasapub"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400"
              >
                <FaFacebook />
              </Link>

              <Link
                href="https://www.twitter.com/dcasapub"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400"
              >
                <FaXTwitter />
              </Link>

            </div>

          </div>

          {/* Links */}

          <div className="grid grid-cols-2 gap-8">

            <div>

              <h3 className="mb-4 font-[family:var(--font-cinzel)] text-xl text-white/95">
                Explore
              </h3>

              <div className="flex flex-col gap-3">

                {exploreLinks.map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/60 transition hover:text-pink-400"
                  >
                    {item.name}
                  </Link>

                ))}

              </div>

            </div>

            <div>

              <h3 className="mb-6 font-[family:var(--font-cinzel)] text-xl text-white/95">
                Legal
              </h3>

              <div className="flex flex-col gap-4">

                {legalLinks.map((item) => (

                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/60 transition hover:text-pink-400"
                  >
                    {item.name}
                  </Link>

                ))}

              </div>

            </div>

                      </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-white/10 py-6">

          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row">

            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} D'Casa Nightclub. All Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">

              <Link
                href="/privacy-policy"
                className="text-white/50 transition duration-300 hover:text-pink-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="text-white/50 transition duration-300 hover:text-pink-400"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/refund-cancellation"
                className="text-white/50 transition duration-300 hover:text-pink-400"
              >
                Refund Policy
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;