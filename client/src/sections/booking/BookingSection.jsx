"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import InputField from "@/components/forms/InputField";
import { createBooking } from "@/services/bookingService";

const BookingSection = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    bookingDate: "",
    tableType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.guests ||
      !formData.bookingDate ||
      !formData.tableType
    ) {
      toast.error("Please fill all fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = await createBooking(formData);

      toast.success(data.message || "Booking successful");

      setFormData({
        name: "",
        phone: "",
        guests: "",
        bookingDate: "",
        tableType: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-pink-400 uppercase tracking-[0.35em] text-sm mb-6">
              VIP Reservation
            </p>

            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[1] tracking-[0.08em]">
              <span className="text-white">Reserve Your</span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                VIP Night
              </span>
            </h2>

            <p className="text-gray-400 text-lg mt-8 leading-relaxed max-w-md">
              Secure your exclusive table experience with premium service,
              luxury seating, and unforgettable nightlife energy curated for
              elite guests.
            </p>

            {/* Small perks */}
            <div className="mt-10 space-y-3 text-sm text-gray-500">
              <p>✓ Priority Entry Access</p>
              <p>✓ Bottle Service Available</p>
              <p>✓ VIP Lounge Seating</p>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
            relative
            bg-white/[0.03]
            border
            border-white/10
            rounded-[28px]
            p-10
            backdrop-blur-2xl
            shadow-[0_10px_50px_rgba(0,0,0,0.5)]
            space-y-6
            overflow-hidden
            group
            "
          >
            {/* Glow Hover Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />

            {/* Inputs */}
            <div className="relative z-10 space-y-5">
              <InputField
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputField
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                type="number"
                placeholder="Number of Guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              />

              <InputField
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
              />

              {/* Select */}
              <select
                name="tableType"
                value={formData.tableType}
                onChange={handleChange}
                className="
                w-full
                bg-black/40
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                text-white
                outline-none
                focus:border-pink-500
                transition
                "
              >
                <option value="">Select Table Type</option>
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="Premium Lounge">Premium Lounge</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
  w-full
  relative
  overflow-hidden
  rounded-2xl
  bg-gradient-to-r
  from-pink-500
  via-purple-500
  to-cyan-500
  py-4
  font-semibold
  uppercase
  tracking-[0.15em]
  text-white
  transition-all
  duration-300
  hover:scale-[1.02]
  disabled:opacity-50
  disabled:cursor-not-allowed
  "
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading && (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  )}

                  {loading
                    ? "Reserving VIP Table..."
                    : "Confirm VIP Reservation"}
                </span>

                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-white/10 transition duration-500" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
