"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getEvents } from "@/services/eventService";
import EventCard from "@/components/cards/EventCard";


const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data.events);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="relative overflow-hidden py-32 px-6 bg-black">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="container-width relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          
          {/* Left Content */}
          <div className="max-w-3xl">
            
            {/* Small Label */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="
              text-pink-400
              uppercase
              tracking-[0.35em]
              text-sm
              mb-5
              "
            >
              Upcoming Events
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-black
              uppercase
              leading-[0.95]
              tracking-[0.08em]
              "
            >
              <span className="text-white">
                Nights You
              </span>

              <br />

              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Never Forget
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="
              mt-8
              text-gray-400
              text-lg
              leading-relaxed
              max-w-2xl
              "
            >
              Join the hottest DJ nights, themed parties, live music performances, and weekend events at D'Casa The Pub in Jabalpur.
            </motion.p>
          </div>

          {/* Right Button */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {pathname !== "/events" ? (
              <Link
              href="/events"
              aria-label="View all upcoming events at DCASA The Pub"
              className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              px-8
              py-4
              text-sm
              uppercase
              tracking-[0.18em]
              text-white
              transition-all
              duration-300
              hover:bg-white
              hover:text-black
              hover:scale-105
              "
            >
              View All Events →
            </Link>
            ) : null}
          </motion.div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-pink-500 border-t-transparent animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-white">
              No Upcoming Events Available
            </h3>

            <p className="text-gray-500 mt-3">
              Stay tuned! New events at D'Casa The Pub will be announced soon.
            </p>
          </div>
        ) : (
          
          /* Events Grid */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;