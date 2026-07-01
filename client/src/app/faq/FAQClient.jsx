"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";

const faqs = [
  {
    question: "How can I reserve a table?",
    answer:
      "You can reserve a table through our official website by selecting your preferred date, table type, number of guests, and completing the booking process.",
  },
  {
    question: "When is my booking confirmed?",
    answer:
      "Your reservation is confirmed only after successful payment and availability verification. A confirmation message will be sent to your registered email or mobile number.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We accept secure online payments through our supported payment gateway. Available payment methods may include UPI, debit cards, credit cards, and net banking.",
  },
  {
    question: "Can I modify my reservation?",
    answer:
      "Booking modifications are subject to availability. Please contact us as early as possible if you wish to make any changes.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation requests are handled according to our Refund & Cancellation Policy. Please review that page for complete details.",
  },
  {
    question: "Is there an age restriction?",
    answer:
      "Yes. Guests must satisfy the minimum legal age requirement applicable in their jurisdiction. A valid government-issued photo ID may be requested at entry.",
  },
  {
    question: "Do I need to carry an ID?",
    answer:
      "Yes. Guests should carry a valid government-issued photo identification for age verification and security purposes.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Smart casual or event-specific dress codes may apply. Management reserves the right to refuse entry if the dress code is not followed.",
  },
  {
    question: "What happens if I arrive late?",
    answer:
      "Please arrive at least 15–30 minutes before your reservation. Significant delays without prior notice may result in your reservation being released.",
  },
  {
    question: "How can I contact D'Casa?",
    answer:
      "You can reach our support team through the Contact page for reservation assistance, event information, or general enquiries.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <LegalHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before visiting D'Casa Nightclub."
      />

      <div className="max-w-5xl mx-auto px-6 pb-24">

        <LegalSection
          center
        >
          <div className="space-y-5">

            {faqs.map((faq, index) => (
              <GlassCard key={index}>

                <button
                  onClick={() =>
                    setOpen(open === index ? -1 : index)
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-[family:var(--font-cinzel)] text-xl">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: open === index ? 180 : 0,
                    }}
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: .3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 text-white/70 leading-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </GlassCard>
            ))}

          </div>
        </LegalSection>

        <CTASection />

      </div>
    </>
  );
}