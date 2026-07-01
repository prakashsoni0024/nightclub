import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";

export const metadata = {
  title: "Terms & Conditions | D'Casa Nightclub",
  description:
    "Read the Terms & Conditions governing reservations, payments, entry policies, and the use of D'Casa Nightclub services.",
};

const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing our website or making a reservation, you agree to comply with these Terms & Conditions and all applicable laws and regulations.",
  },
  {
    title: "Eligibility",
    content:
      "Guests must meet the minimum legal age required for entry according to local laws. A valid government-issued photo ID may be required at the entrance.",
  },
  {
    title: "Table Reservations",
    content:
      "Reservations are confirmed only after successful payment and availability confirmation. We reserve the right to decline or modify bookings in exceptional circumstances.",
  },
  {
    title: "Payments",
    content:
      "All payments are securely processed through authorized payment partners. Prices displayed on the website are subject to change without prior notice.",
  },
  {
    title: "Entry Policy",
    content:
      "Management reserves the right to refuse entry or remove any guest whose behavior is considered inappropriate, unsafe, or disruptive.",
  },
  {
    title: "Dress Code",
    content:
      "Smart casual or event-specific dress codes may apply. Guests not meeting the dress requirements may be denied entry.",
  },
  {
    title: "Guest Conduct",
    content:
      "Guests are expected to behave respectfully toward staff and other visitors. Illegal activities, violence, harassment, or damage to property will not be tolerated.",
  },
  {
    title: "Photography & Media",
    content:
      "Photographs or videos taken during events may be used for promotional purposes unless prohibited by applicable law.",
  },
  {
    title: "Limitation of Liability",
    content:
      "D'Casa shall not be liable for personal belongings lost, stolen, or damaged while visiting the venue, except where required by applicable law.",
  },
  {
    title: "Changes to Terms",
    content:
      "These Terms & Conditions may be updated periodically. Continued use of our services constitutes acceptance of any revised terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <LegalHero
        title="Terms & Conditions"
        subtitle="Please review these terms carefully before making a reservation or using any of our services."
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <LegalSection
          center
        >
          <div className="space-y-8">

            {terms.map((item, index) => (
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