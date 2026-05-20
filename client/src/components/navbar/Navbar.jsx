"use client";

import Link from "next/link";
import { useState } from "react";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Glassmorphism Navbar */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-[0.25em] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
          >
            NOIR
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.path}
                  className="relative text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white transition duration-300 group"
                >
                  {link.name}

                  {/* Hover Underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* CTA Button */}
            <Link
              href="/booking"
              className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:scale-105 transition duration-300"
            >
              Book Table
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 mx-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-6"
        >
          <nav className="flex flex-col gap-5">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-pink-400 transition"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/booking"
              className="mt-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book VIP Table
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;