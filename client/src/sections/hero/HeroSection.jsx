"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />

      {/* Animated Glow */}
      <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-pink-500/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
    inline-flex
    items-center
    gap-1.5
    sm:gap-2
    px-3
    sm:px-4
    py-1.5
    sm:py-2
    rounded-full
    border
    border-white/10
    bg-white/5
    backdrop-blur-xl
    text-[10px]
    sm:text-sm
    uppercase
    tracking-[0.15em]
    sm:tracking-[0.25em]
    text-pink-400
    mb-6
    sm:mb-8
  "
        >
          ✦ Exclusive Night Experience
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl sm:text-7xl md:text-9xl font-black font-cormorant leading-none"
        >
          <span className="text-white">D'Casa</span>

          <br />

          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            The Pub
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
mt-8
max-w-3xl
mx-auto
text-base
sm:text-lg
md:text-xl
text-gray-300
leading-relaxed
font-[family-name:var(--font-body)]
font-light
tracking-wide
"
        >
          Experience the ultimate nightlife at D'Casa The Pub. Enjoy live DJ
          nights, premium cocktails, delicious food, VIP table booking, exciting
          weekend events.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Primary Button */}
          <Link
            href="/booking"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-4 text-white font-semibold tracking-wide shadow-[0_10px_40px_rgba(236,72,153,0.35)] transition duration-300 hover:scale-105"
          >
            <span className="relative z-10">Book VIP Table</span>

            <div className="absolute inset-0 translate-y-full bg-white/10 transition duration-500 group-hover:translate-y-0" />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/events"
            className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 text-white hover:bg-white hover:text-black transition duration-300"
          >
            <FaPlay className="text-sm" />
            Explore Events
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "50K+", label: "Night Lovers" },
            { number: "120+", label: "Live Events" },
            { number: "25+", label: "Top DJs" },
            { number: "5★", label: "Luxury Experience" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <h3 className="text-3xl font-cinzel font-bold text-white">
                {item.number}
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1.5,
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-12 rounded-full border border-white/20 flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
