"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function GallerySection({
  gallery,
  galleryLabel,
  setGalleryLabel,
  galleryFile,
  setGalleryFile,
  handleGalleryUpload,
  galleryLoading,
  handleDeleteImage,
  galleryDeleteLoading,
}) {
  return (
    <div
      id="Gallery"
      className="
  p-5 sm:p-8
  rounded-[24px] sm:rounded-[30px]
  border border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
  "
    >
      <h2
        className="
    text-2xl
    sm:text-3xl
    font-black
    uppercase
    mb-6 sm:mb-8
    "
      >
        Gallery Upload
      </h2>

      {/* Upload Controls */}
      <div
        className="
    grid
    grid-cols-1
    lg:grid-cols-3
    gap-4
    mb-6 sm:mb-8
    "
      >
        <input
          type="text"
          placeholder="Image Label"
          value={galleryLabel}
          onChange={(e) => setGalleryLabel(e.target.value)}
          className="
      p-3 sm:p-4
      rounded-2xl
      bg-black
      border border-white/10
      text-sm sm:text-base
      outline-none
      "
        />

        <input
          type="file"
          onChange={(e) => setGalleryFile(e.target.files[0])}
          className="
      p-3 sm:p-4
      rounded-2xl
      bg-black
      border border-white/10
      text-sm sm:text-base
      "
        />

        <button
          onClick={handleGalleryUpload}
          disabled={galleryLoading}
          className="
      py-3 sm:py-4
      rounded-2xl
      bg-gradient-to-r
      from-pink-500
      via-purple-500
      to-cyan-400
      text-black/90
      font-bold
      text-sm sm:text-base
      disabled:opacity-50
      hover:scale-[1.02]
      transition-all duration-300
      "
        >
          {galleryLoading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Gallery Grid */}
      <div
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-4 sm:gap-6
    "
      >
        {gallery.map((img) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={img._id}
            className="
            group
        relative overflow-hidden
        rounded-[20px] sm:rounded-[24px]
        border border-white/10
        "
          >
            <img
              src={img.imageUrl}
              alt=""
             className="
w-full
h-[240px] sm:h-[300px]
object-cover
group-hover:scale-110
transition-transform duration-700
"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div
              className="
          absolute bottom-4 left-4
          text-[10px] sm:text-xs
          tracking-[0.2em] sm:tracking-[0.3em]
          uppercase
          text-purple-200
          pr-10
          "
            >
              <p className="font-semibold break-words">{img.label}</p>
            </div>

            <button
              onClick={() => handleDeleteImage(img._id)}
              className="
          absolute top-3 right-3
          w-8 h-8
          sm:w-9 sm:h-9
          rounded-xl
          bg-red-500/60
          border border-red-500/20
          hover:bg-red-600
          flex items-center justify-center
          transition-all
          "
            >
              {galleryDeleteLoading === img._id ? (
                "..."
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}