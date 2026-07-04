"use client";
import {
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";

const contactItems = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    value: "+91 98765 43210",
    link: "tel:+919876543210",
    external: false,
  },
  {
    icon: <MdOutlineEmail />,
    title: "Email",
    value: "info@dcasapub.com",
    link: "mailto:info@dcasapub.com",
    external: false,
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Deendayal, Jabalpur, Madhya Pradesh",
    link: "https://maps.google.com/?q=Deendayal,+Jabalpur,+Madhya+Pradesh",
    external: true,
  },
  {
    icon: <FaClock />,
    title: "Opening Hours",
    value: "Mon - Sun : 7:00 PM - 4:00 AM",
  },
  {
    icon: <FaInstagram />,
    title: "Instagram",
    value: "@dcasapub",
    link: "https://instagram.com/dcasapub",
    external: true,
  },
];

const ContactSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#070A12] px-6 py-32"
      id="contact"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[160px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.05]" />

      <div className="container-width relative z-10">
        {/* Heading */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
             className="mb-5 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Get In Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black font-cinzel leading-none tracking-[0.08em] md:text-7xl"
            >
            <span className="text-white">Let's Connect</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              &amp; Party Together
            </span>
          </motion.h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            We’re always ready to bring you into the most exclusive nightlife
            experience. Reach out, book, or visit us for unforgettable nights.
          </p>
        </div>

        <div className="grid items-stretch gap-14 lg:grid-cols-2">
          {/* Left Side */}
           <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex h-[520px] flex-col gap-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  flex
                  flex-1
                  items-start
                  gap-5
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-cyan-500/30
                  hover:bg-white/[0.06]
                "
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 mt-1 text-2xl text-cyan-400">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-400 transition hover:text-cyan-400"
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-400">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Side Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              relative
              h-[520px]
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              shadow-[0_20px_80px_rgba(0,0,0,0.6)]
              backdrop-blur-xl
            "
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />

            <iframe
              title="D'Casa The Pub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3635069438515!2d79.9157984!3d23.193419599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b1d3ae8eefcd%3A0x5765c228b8a26b1d!2sD&#39;casa%20The%20Pub!5e0!3m2!1sen!2sin!4v1779303237086!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;