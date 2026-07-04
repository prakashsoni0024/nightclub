"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import { useRouter } from "next/navigation";

const EventCard = ({ event }) => {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4 }}
      className="
      group
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-2xl
      shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Neon Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />

      {/* Image Section */}
      <div className="relative h-[420px] overflow-hidden">
        {/* Image */}
        <img
          src={event.image}
          alt={`${event.title} at D'Casa The Pub, Jabalpur`}
          loading="lazy"
          decoding="async"
          className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-5 left-5">
          <span
            className="
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl
            px-4
            py-2
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-pink-400
            "
          >
            Live Event
          </span>
        </div>

        {/* Floating Price */}
        <div
          className="
          absolute
          top-5
          right-5
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          "
        >
          ₹{event.price}
        </div>

        {/* Bottom Content On Image */}
        <div className="absolute bottom-0 left-0 p-7 w-full">
          {/* Date */}
          <p
            className="
            text-pink-400
            text-sm
            uppercase
            tracking-[0.3em]
            mb-3
            "
          >
            {event.date}
          </p>

          {/* Title */}
          <h3
            className="
            text-3xl
            md:text-4xl
            font-black
            uppercase
            leading-tight
            tracking-[0.05em]
            font-cinzel
            text-white
            "
          >
            {event.title}
          </h3>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 p-6">
        {/* Description */}
        <p className="text-gray-400 line-clamp-3 ... leading-relaxed text-sm">
          {event.description}
        </p>

        {/* Bottom Row */}
        <div className="mt-7 flex items-center justify-between">
          {/* Guests */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
              Booking
            </p>

            <h4 className="text-white/90 font-semibold mt-1">Reserve Online</h4>
          </div>

          {/* Button */}
          <button
            onClick={() => router.push("/booking")}
            aria-label={`Book a table for ${event.title}`}
            className="
      group/btn
      flex
      items-center
      gap-3
      rounded-full
      bg-gradient-to-r
      from-pink-500
      via-purple-500
      to-cyan-500
      px-6
      py-3
      text-sm
      font-semibold
      uppercase
      tracking-[0.15em]
      text-white
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-[0_10px_40px_rgba(236,72,153,0.35)]
      "
          >
            Reserve
            <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />
    </motion.div>
  );
};

export default EventCard;
