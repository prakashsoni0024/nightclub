import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";

export const metadata = {
  title: "Booking Policy | D'Casa Nightclub",
  description:
    "Read our booking policy for table reservations, guest guidelines, arrival timings, and VIP booking information.",
};

const bookingPolicy = [
  {
    title: "Reservation Process",
    content:
      "Reservations can be made through our official website by selecting your preferred date, time, table type, and number of guests. A booking request is confirmed only after successful payment and availability verification.",
  },
  {
    title: "Booking Confirmation",
    content:
      "Once your reservation is confirmed, a confirmation message containing your booking details will be sent to the email address or mobile number provided during checkout.",
  },
  {
    title: "Arrival Time",
    content:
      "Guests are requested to arrive at least 15–30 minutes before their scheduled reservation time to ensure a smooth check-in experience.",
  },
  {
    title: "Late Arrival",
    content:
      "If guests arrive significantly late without prior notice, management reserves the right to release the reserved table based on availability.",
  },
  {
    title: "Valid Identification",
    content:
      "All guests may be required to present a valid government-issued photo ID before entry. Entry may be denied if age verification cannot be completed.",
  },
  {
    title: "Guest Responsibility",
    content:
      "The person making the reservation is responsible for ensuring that all guests comply with club rules, local laws, and venue policies.",
  },
  {
    title: "VIP Table Reservations",
    content:
      "VIP reservations are subject to availability. Special requests may be accommodated whenever possible but cannot be guaranteed.",
  },
  {
    title: "Dress Code",
    content:
      "Guests are expected to follow the applicable dress code. Management reserves the right to refuse entry to guests whose attire is considered inappropriate for the venue.",
  },
  {
    title: "Changes to Reservation",
    content:
      "Requests to modify booking details, including guest count or reservation time, are subject to availability and operational requirements.",
  },
  {
    title: "Management Rights",
    content:
      "D'Casa reserves the right to modify or cancel reservations due to safety concerns, venue capacity, private events, technical issues, or circumstances beyond our reasonable control.",
  },
];

export default function BookingPolicyPage() {
  return (
    <>
      <LegalHero
        title="Booking Policy"
        subtitle="Please review our reservation guidelines to ensure a smooth and enjoyable experience at D'Casa Nightclub."
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <LegalSection
          center
        >
          <div className="space-y-8">

            {bookingPolicy.map((item, index) => (
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