import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";

export const metadata = {
  title: "Privacy Policy | D'Casa Nightclub",
  description:
    "Read the Privacy Policy of D'Casa Nightclub to understand how we collect, use, protect, and manage your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: `When you make a reservation, contact us, or use our website, we may collect your name, email address, phone number, booking details, and payment-related information required to process your reservation securely.`,
  },
  {
    title: "How We Use Your Information",
    content: `Your information is used to manage reservations, provide customer support, send booking confirmations, improve our services, and communicate important updates related to your booking or events.`,
  },
  {
    title: "Payment Security",
    content: `All online payments are processed through secure third-party payment providers. We do not store your complete debit or credit card details on our servers.`,
  },
  {
    title: "Cookies & Analytics",
    content: `Our website may use cookies and analytics tools to enhance user experience, understand visitor behavior, and improve website performance. You may disable cookies through your browser settings.`,
  },
  {
    title: "Third-Party Services",
    content: `We may use trusted third-party services such as payment gateways, email providers, analytics platforms, and hosting providers. These services process information only as necessary to deliver their respective services.`,
  },
  {
    title: "Data Protection",
    content: `We implement reasonable administrative and technical safeguards to protect your personal information against unauthorized access, misuse, or disclosure.`,
  },
  {
    title: "Your Rights",
    content: `You may request access to, correction of, or deletion of your personal information by contacting our support team, subject to applicable legal obligations.`,
  },
  {
    title: "Policy Updates",
    content: `This Privacy Policy may be updated from time to time. Changes become effective immediately upon publication on this page.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero
        title="Privacy Policy"
        subtitle="Your privacy matters to us. This policy explains how D'Casa collects, uses, protects, and manages your personal information."
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <LegalSection
          center
        >
          <div className="space-y-8">

            {sections.map((section, index) => (
              <GlassCard key={index}>

                <h2 className="font-[family:var(--font-cinzel)] text-2xl text-white mb-5">
                  {section.title}
                </h2>

                <p className="text-white/70 leading-8">
                  {section.content}
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