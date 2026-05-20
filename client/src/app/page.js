import HeroSection from "@/sections/hero/HeroSection";
import EventsSection from "@/sections/events/EventsSection";
import GallerySection from "@/sections/gallery/GallerySection";
import BookingSection from "@/sections/booking/BookingSection";
import ContactSection from "@/sections/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <GallerySection />
      <BookingSection />
      <ContactSection />
    </>
  );
}