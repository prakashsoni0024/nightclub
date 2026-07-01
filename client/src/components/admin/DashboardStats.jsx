"use client";

import { motion } from "framer-motion";

export default function DashboardStats({ stats }) {
  return (
    <div
      id="Dashboard"
      className="
        grid
        grid-cols-2
        xl:grid-cols-4
        gap-3 sm:gap-4
        mb-10 lg:mb-12
      "
    >
      {stats.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="
            group
            relative
            p-4 sm:p-5
            rounded-[22px]
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            hover:border-pink-500/30
            hover:bg-white/[0.05]
            transition-all duration-300
            overflow-hidden
          "
        >
          <div
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition duration-500
              bg-gradient-to-br
              from-pink-500/10
              via-transparent
              to-cyan-500/10
            "
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                "
              >
                {item.title}
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  mt-2
                  leading-none
                  break-words
                "
              >
                {item.value}
              </h2>
            </div>

            <div
              className="
                w-11 h-11
                sm:w-12 sm:h-12
                rounded-2xl
                bg-gradient-to-br
                from-pink-500/15
                to-cyan-500/15
                border border-white/10
                flex items-center justify-center
                shrink-0
              "
            >
              <item.icon size={20} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}