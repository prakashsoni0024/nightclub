import {
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="relative py-32 px-6 bg-[#070A12] overflow-hidden">
      {/* Soft Neon Background (different from booking section) */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[160px] rounded-full" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container-width relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-cyan-400 uppercase tracking-[0.35em] text-sm mb-5">
            Get In Touch
          </p>

          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[1] tracking-[0.08em]">
            <span className="text-white">Let’s Connect</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              & Party Together
            </span>
          </h2>

          <p className="text-gray-400 mt-8 max-w-2xl mx-auto text-lg">
            We’re always ready to bring you into the most exclusive nightlife
            experience. Reach out, book, or visit us for unforgettable nights.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* LEFT CARDS */}
          <div className="space-y-6">
            {[
              {
                icon: <FaPhoneAlt />,
                title: "Phone",
                value: "+91 9876543210",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Location",
                value: "Deendayal, Jabalpur, Madhya Pradesh",
              },
              {
                icon: <FaClock />,
                title: "Opening Hours",
                value: "Mon - Sun : 7PM - 4AM",
              },
              {
                icon: <FaInstagram />,
                title: "Instagram",
                value: "@dcasapub",
                link: "https://instagram.com/dcasapub",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                group
                relative
                flex
                gap-5
                items-start
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-6
                transition
                duration-500
                hover:bg-white/[0.06]
                hover:border-cyan-500/30
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />

                {/* Icon */}
                <div className="text-cyan-400 text-2xl mt-1 relative z-10">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {item.title}
                  </h3>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      className="text-gray-400 hover:text-cyan-400 transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-400">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT MAP */}
          <div
            className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            h-[520px]
            shadow-[0_20px_80px_rgba(0,0,0,0.6)]
            "
          >
            {/* Map Glow Overlay */}
            <div
              className="
    absolute
    inset-0
    bg-gradient-to-t from-black via-transparent to-transparent
    z-10
    pointer-events-none
    group-hover:opacity-30
    transition
  "
            />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3635069438515!2d79.9157984!3d23.193419599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b1d3ae8eefcd%3A0x5765c228b8a26b1d!2sD&#39;casa%20The%20Pub!5e0!3m2!1sen!2sin!4v1779303237086!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
