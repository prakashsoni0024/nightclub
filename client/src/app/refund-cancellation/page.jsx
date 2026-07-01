import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";

export const metadata = {
  title: "Refund & Cancellation Policy | D'Casa Nightclub",
  description:
    "Read our refund and cancellation policy for table reservations, payments, booking changes, and event cancellations.",
};

const policy = [
  {
    title: "Booking Cancellation",
    content:
      "Guests may request cancellation before the scheduled reservation time. Cancellation requests are subject to our refund eligibility criteria and approval process.",
  },
  {
    title: "Refund Eligibility",
    content:
      "Refund eligibility depends on the timing of the cancellation, the nature of the reservation, and any promotional offers applied at the time of booking.",
  },
  {
    title: "No-Show Policy",
    content:
      "If a guest does not arrive for the reserved booking without prior cancellation, the reservation may be treated as a no-show and may not be eligible for a refund.",
  },
  {
    title: "Club Cancellation",
    content:
      "If D'Casa cancels an event or reservation due to operational reasons, safety concerns, or circumstances beyond our control, eligible guests will be informed regarding available refund or rescheduling options.",
  },
  {
    title: "Refund Processing",
    content:
      "Approved refunds are generally processed to the original payment method. Processing time may vary depending on your payment provider and banking institution.",
  },
  {
    title: "Payment Gateway",
    content:
      "All online payments are securely processed through authorized payment gateway partners. Any gateway processing timelines are governed by the respective payment provider.",
  },
  {
    title: "Modification of Bookings",
    content:
      "Requests to change reservation date, time, or guest count are subject to availability and may not always be possible.",
  },
  {
    title: "Contact for Refund Queries",
    content:
      "For refund, cancellation, or booking-related assistance, please contact our support team using the contact information provided on our Contact page.",
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <LegalHero
        title="Refund & Cancellation Policy"
        subtitle="Our policy is designed to ensure fairness and transparency for all reservations made through D'Casa."
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <LegalSection
          center
        >
          <div className="space-y-8">

            {policy.map((item, index) => (
              <GlassCard key={index}>
                <h2 className="font-[family:var(--font-cinzel)] text-2xl text-white mb-5">
                  {item.title}
                </h2>

                <p className="text-white/70 leading-8">
                  {item.content}
                </p>
              </GlassCard>
            ))}

          </div>
        </LegalSection>

        <CTASection />

      </div>
    </>
  );
}