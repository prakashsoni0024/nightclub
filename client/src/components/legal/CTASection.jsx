"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .7 }}
        className="
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          p-10
          md:p-16
        "
      >

        {/* Glow */}
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto text-center">

          <span className="uppercase tracking-[0.35em] text-pink-400 text-xs">
            Need Assistance?
          </span>

          <h2 className="mt-5 font-[family:var(--font-cinzel)] text-3xl md:text-5xl font-bold">
            We're Here To Help
          </h2>

          <p className="mt-6 text-white/70 leading-8">
            Have questions about reservations, events, or our policies?
            Our team is always ready to assist you.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/contact"
              className="
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-purple-600
                px-8
                py-3
                font-semibold
                hover:scale-105
                transition
              "
            >
              Contact Us
            </Link>

            <Link
              href="/booking"
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-8
                py-3
                hover:bg-white/10
                transition
              "
            >
              Book A Table
            </Link>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default CTASection;