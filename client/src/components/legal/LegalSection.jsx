"use client";

import { motion } from "framer-motion";

const LegalSection = ({
  title,
  subtitle,
  children,
  center = false,
}) => {
  return (
    <section className="py-10">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
      >

        {(title || subtitle) && (
          <div
            className={`mb-10 ${
              center ? "text-center max-w-3xl mx-auto" : ""
            }`}
          >
            {title && (
              <h2 className="font-[family:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-5 text-white/65 leading-8">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {children}

      </motion.div>
    </section>
  );
};

export default LegalSection;