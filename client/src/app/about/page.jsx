import LegalHero from "@/components/legal/LegalHero";
import LegalSection from "@/components/legal/LegalSection";
import GlassCard from "@/components/legal/GlassCard";
import CTASection from "@/components/legal/CTASection";
import {
  FaChampagneGlasses,
  FaMusic,
  FaCrown,
  FaShieldHeart,
} from "react-icons/fa6";

export const metadata = {
  title: "About Us | D'Casa Nightclub",
  description:
    "Learn more about D'Casa Nightclub, our luxury nightlife experience, VIP table reservations, exclusive events, and exceptional hospitality.",
};

const features = [
  {
    icon: FaChampagneGlasses,
    title: "Luxury Ambience",
    description:
      "Elegant interiors, premium seating, and a sophisticated atmosphere designed for unforgettable nights.",
  },
  {
    icon: FaMusic,
    title: "Live DJs & Events",
    description:
      "Experience energetic performances, themed nights, and music that keeps the celebration alive.",
  },
  {
    icon: FaCrown,
    title: "VIP Experience",
    description:
      "Enjoy exclusive VIP table reservations with personalized service and premium comfort.",
  },
  {
    icon: FaShieldHeart,
    title: "Safety First",
    description:
      "We prioritize guest safety, responsible service, and a welcoming environment for everyone.",
  },
];

export default function AboutPage() {
  return (
    <>
      <LegalHero
        title="About D'Casa"
        subtitle="Where luxury nightlife meets unforgettable experiences. We create memorable evenings through premium hospitality, vibrant entertainment, and exceptional service."
      />

      <div className="max-w-7xl mx-auto px-6 pb-24">

        {/* Our Story */}
        <LegalSection title="Our Story">
          <GlassCard>
            <p className="text-white/70 leading-8">
              D'Casa was created with one vision—to redefine nightlife by
              combining luxury, entertainment, and hospitality in one
              destination. Every evening is designed to deliver an unforgettable
              experience through vibrant music, stylish interiors, and premium
              service.
            </p>

            <p className="text-white/70 leading-8 mt-6">
              Whether you're celebrating a special occasion, reserving a VIP
              table, or simply enjoying a night out with friends, our team is
              dedicated to making every moment extraordinary.
            </p>
          </GlassCard>
        </LegalSection>

        {/* Why Choose Us */}
        <LegalSection
          title="Why Choose D'Casa"
          subtitle="Every detail is thoughtfully crafted to deliver an elevated nightlife experience."
          center
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <GlassCard key={index}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl mb-6">
                    <Icon />
                  </div>

                  <h3 className="font-[family:var(--font-cinzel)] text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-white/65 mt-4 leading-7 text-sm">
                    {item.description}
                  </p>
                </GlassCard>
              );
            })}

          </div>
        </LegalSection>

        {/* Mission */}
        <LegalSection title="Our Mission">
          <GlassCard>
            <p className="text-white/70 leading-8">
              Our mission is to provide a premium nightlife destination where
              guests can relax, celebrate, and create lasting memories in a safe
              and welcoming environment. Through outstanding hospitality,
              carefully curated events, and seamless online booking, we strive
              to exceed every guest's expectations.
            </p>
          </GlassCard>
        </LegalSection>

        <CTASection />

      </div>
    </>
  );
}