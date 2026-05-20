import Link from "next/link";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black overflow-hidden">

      {/* Soft glow like navbar vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/10 blur-[160px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">

        {/* TOP SECTION (aligned system like navbar) */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand (same vibe as navbar logo) */}
          <div>
            <h2 className="text-2xl font-bold tracking-widest text-pink-500">
              NOIR
            </h2>

            <p className="text-gray-400 mt-4 max-w-sm text-sm leading-relaxed">
              Premium nightlife experience with music, luxury, and unforgettable events.
            </p>
          </div>

          {/* Navigation (same structure as navbar links) */}
          <div className="flex flex-col sm:flex-row gap-10 text-sm uppercase tracking-wide text-gray-400">

            <div className="flex flex-col gap-3">
              <span className="text-white/70 text-xs tracking-[0.2em]">Navigation</span>
              <Link href="/" className="hover:text-pink-500 transition">Home</Link>
              <Link href="/events" className="hover:text-pink-500 transition">Events</Link>
              <Link href="/gallery" className="hover:text-pink-500 transition">Gallery</Link>
              <Link href="/booking" className="hover:text-pink-500 transition">Booking</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white/70 text-xs tracking-[0.2em]">Support</span>
              <Link href="/contact" className="hover:text-pink-500 transition">Contact</Link>
              <Link href="/" className="hover:text-pink-500 transition">FAQ</Link>
              <Link href="/" className="hover:text-pink-500 transition">Terms</Link>
            </div>

          </div>

          {/* Social (aligned like navbar icon button) */}
          <div className="flex flex-col gap-4">

            <span className="text-white/70 text-xs tracking-[0.2em] uppercase">
              Social
            </span>

            <div className="flex gap-4 text-lg text-gray-400">
              <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
              <FaFacebook className="hover:text-pink-500 transition cursor-pointer" />
              <FaXTwitter className="hover:text-pink-500 transition cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Divider (same system as navbar border) */}
        <div className="border-t border-white/10 my-10" />

        {/* Bottom row (clean system alignment) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-pink-500 font-semibold tracking-widest">
              NOIR
            </span>
          </p>

          <p className="text-xs tracking-[0.2em] uppercase text-gray-600">
            Designed for premium nightlife experience
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;