"use client";

import { useEffect, useState } from "react";
import { checkAvailability } from "@/services/bookingService";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import InputField from "@/components/forms/InputField";
import loadRazorpay from "@/utils/loadRazorpay";
import { createOrder, verifyPayment } from "@/services/paymentService";
import InvoiceModal from "@/components/invoice/InvoiceModal";

const BookingSection = () => {
  const [loading, setLoading] = useState(false);

  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    bookingDate: "",
    tableType: "",
  });

  // HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    // PHONE VALIDATION
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");

      if (cleaned.length > 10) return;

      setFormData({
        ...formData,
        phone: cleaned,
      });

      return;
    }

    // GUEST VALIDATION
    if (name === "guests") {
      if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
        setFormData({
          ...formData,
          guests: value,
        });
      } else if (Number(value) > 10) {
        toast.error("Maximum 10 guests allowed");
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // FORM VALIDATION
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.guests ||
      !formData.bookingDate ||
      !formData.tableType
    ) {
      toast.error("Please fill all fields");
      return false;
    }

    // VALID PHONE
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return false;
    }

    // VALID EMAIL
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter valid email address");
      return false;
    }

    // GUEST LIMIT
    if (formData.guests < 1 || formData.guests > 10) {
      toast.error("Guests must be between 1 and 10");
      return false;
    }

    // PAST DATE BLOCK
    const today = new Date().toISOString().split("T")[0];

    if (formData.bookingDate < today) {
      toast.error("Past date booking not allowed");
      return false;
    }

    return true;
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateForm()) return;

    try {
      setLoading(true);

      const loaded = await loadRazorpay();

      if (!loaded) {
        toast.error("Payment system failed to load");
        return;
      }

      // CREATE ORDER
      const response = await createOrder(formData.tableType);

      if (!response.success) {
        toast.error("Order creation failed");
        return;
      }

      const order = response.order;

      // RAZORPAY
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NightClub VIP",
        description: `${formData.tableType} Table Booking`,
        order_id: order.id,

        handler: async function (response) {
          try {
            const bookingData = {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              guests: formData.guests,
              bookingDate: formData.bookingDate,
              tableType: formData.tableType,
            };

            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData,
            });

            if (result.success) {
              const invoice = {
                bookingId: result.booking?._id || response.razorpay_order_id,

                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                guests: formData.guests,
                bookingDate: formData.bookingDate,
                tableType: formData.tableType,

                amount: result.booking.amount,

                paymentId: response.razorpay_payment_id,
              };

              setInvoiceData(invoice);

              setShowInvoice(true);

              setAvailability(null);

              toast.success("🎉 Booking Confirmed!");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              setFormData({
                name: "",
                email: "",
                phone: "",
                guests: "",
                bookingDate: "",
                tableType: "",
              });
            } else {
              toast.error(result.message || "Payment verification failed");
            }
          } catch (err) {
            console.log(err);
            toast.error("Something went wrong after payment");
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#ec4899",
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment popup closed");
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        console.log("Payment Failed:", response);

        toast.error(
          response.error.description || "Payment failed or cancelled",
        );

        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // CHECK AVAILABILITY
  const handleCheckAvailability = async (bookingDate, tableType) => {
    try {
      if (!bookingDate || !tableType) return;

      setCheckingAvailability(true);

      const data = await checkAvailability(bookingDate, tableType);

      setAvailability(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCheckingAvailability(false);
    }
  };

  useEffect(() => {
    if (formData.bookingDate && formData.tableType) {
      handleCheckAvailability(formData.bookingDate, formData.tableType);
    }
  }, [formData.bookingDate, formData.tableType]);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-black overflow-hidden">
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

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-pink-400 uppercase tracking-[0.35em] text-sm mb-6">
              Table Reservation
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-cinzel leading-[1] tracking-[0.08em]">
              <span className="text-white">Reserve Your</span>

              <br />

              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                VIP Night
              </span>
            </h2>

            <p className="text-gray-400 text-lg mt-8 leading-relaxed max-w-md">
              Reserve your table at D'Casa the pub, Jabalpur for live DJ nights,
              weekend parties, birthday celebrations, couple nights, and special
              events.
            </p>

            <div className="mt-10 space-y-3 text-sm text-gray-500">
              <p>✓ Priority Entry Access</p>

              <p>✓ Bottle Service Available</p>

              <p>✓ VIP Lounge Seating</p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
            relative
            bg-gradient-to-br
            from-white/[0.05]
            to-white/[0.02]
            border border-white/10
            rounded-[32px]
            p-6 sm:p-8 lg:p-10
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
            space-y-6
            overflow-hidden
            group
          "
          >
            {/* HOVER GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />

            <div className="relative z-10 space-y-5">
              <InputField
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputField
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
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
                name="guests"
                min="1"
                max="10"
                placeholder="Number of Guests"
                value={formData.guests}
                onChange={handleChange}
              />

              {/* DATE */}
              <InputField
                type="date"
                name="bookingDate"
                placeholder="Select Date"
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />

              {/* TABLE SELECT */}
              <div className="relative w-full group">
                <select
                  name="tableType"
                  value={formData.tableType}
                  onChange={handleChange}
                  className="
                  w-full
                  appearance-none
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  px-5
                  py-4
                  pr-14
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  hover:border-pink-500/50
                  focus:border-pink-500
                "
                >
                  <option value="">Select Table Type</option>

                  <option value="REGULAR">Regular</option>

                  <option value="VIP">VIP</option>

                  <option value="PREMIUM_LOUNGE">Premium Lounge</option>
                </select>

                {/* AVAILABILITY */}
                <div className="mt-3 min-h-[40px]">
                  {checkingAvailability ? (
                    <div className="animate-pulse flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-pink-500/40" />

                      <div className="h-3 w-40 rounded bg-white/10" />
                    </div>
                  ) : (
                    availability && (
                      <>
                        {availability.isAvailable ? (
                          <div
                            className="
                            flex items-center gap-3
                            rounded-xl
                            border border-green-500/20
                            bg-green-500/10
                            px-4 py-3
                          "
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />

                            <p className="text-green-300 text-sm font-medium tracking-wide">
                              {availability.available} Tables Available for
                              Selected Date
                            </p>
                          </div>
                        ) : (
                          <div
                            className="
                            flex items-center gap-3
                            rounded-xl
                            border border-red-500/20
                            bg-red-500/10
                            px-4 py-3
                          "
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />

                            <p className="text-red-300 text-sm font-medium tracking-wide">
                              Fully Booked For Selected Date
                            </p>
                          </div>
                        )}
                      </>
                    )
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading || !availability?.isAvailable}
                className="
                w-full
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-pink-500
                via-fuchsia-500
                to-cyan-500
                py-4
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_15px_45px_rgba(236,72,153,0.45)]
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading && (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  )}

                  {loading
                    ? "Processing Reservation..."
                    : availability?.isAvailable
                      ? "Reserve Your Table"
                      : "Select Available Date"}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </div>
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        booking={invoiceData}
      />
    </section>
  );
};

export default BookingSection;
