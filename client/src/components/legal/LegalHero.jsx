"use client";

import { motion } from "framer-motion";

const LegalHero = ({
  title,
  subtitle,
  badge = "D'Casa Nightclub",
}) => {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-pink-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="max-w-4xl mx-auto text-center"
        >

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-pink-500/20 bg-white/5 px-5 py-2 backdrop-blur-xl">
            <span className="text-xs uppercase tracking-[0.35em] text-pink-400">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-8 font-[family:var(--font-cinzel)] text-4xl md:text-6xl font-bold leading-tight">

            <span className="bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
              {title}
            </span>

          </h1>

          {/* Subtitle */}
          <p className="mt-7 text-white/70 leading-8 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>

        </motion.div>

      </div>
    </section>
  );
};

export default LegalHero;