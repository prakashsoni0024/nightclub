"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { getGallery } from "@/services/galleryService";

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGallery();
        setImages(data.images);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="relative py-32 px-6 bg-[#0B0B10] overflow-hidden">
      {/* Soft cinematic spotlight (NO neon overload) */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full" />

      {/* Subtle grain/grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:120px_120px]" />

      <div className="container-width relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-purple-300 uppercase tracking-[0.4em] text-sm"
          >
            D'Casa Gallery
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase mt-6 tracking-[0.1em]"
          >
            <span className="text-white">Moments</span>{" "}
            <span className="text-purple-400">Captured</span>
          </motion.h2>

          <p className="text-gray-400 mt-8 max-w-2xl mx-auto">
            A curated collection of nightlife memories — styled like a luxury
            editorial gallery.
          </p>
        </div>

        {/* Gallery Grid (clean museum style) */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-white">
              Gallery Coming Soon
            </h3>

            <p className="text-gray-500 mt-3">
              We're adding photos from our latest DJ nights, live events and premium nightlife experiences. Check back soon.
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="
          group
          relative
          overflow-hidden
          rounded-2xl
          break-inside-avoid
          bg-white/[0.03]
          border
          border-white/10
        "
              >
                <img
                  src={img.imageUrl}
                  alt={`${img.label || "Nightlife"} - DCASA The Pub Jabalpur`}
                  loading="lazy"
                  decoding="async"
                  className="
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
            opacity-90
            group-hover:opacity-100
          "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 text-xs tracking-[0.3em] uppercase text-purple-200">
                  {img.label || "Nightlife"}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
