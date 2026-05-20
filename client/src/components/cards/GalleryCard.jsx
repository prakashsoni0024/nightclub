"use client";

import { motion } from "framer-motion";

const GalleryCard = ({ image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="
      group
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.4)]
      "
    >
      {/* Neon Glow Hover Layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-cyan-500/20" />

      {/* Image */}
      <div className="relative h-[320px] md:h-[380px] overflow-hidden">
        <img
          src={image}
          alt="gallery"
          className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          "
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      {/* Floating highlight line */}
      <div className="absolute inset-0 border border-white/5 rounded-[28px] pointer-events-none" />

      {/* Corner glow accent */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 rounded-full" />
    </motion.div>
  );
};

export default GalleryCard;