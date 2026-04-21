import { HeroSection } from "./components/HeroSection";
import { TicketSection } from "./components/TicketSection";
import { EventDetailsSection } from "./components/EventDetailsSection";
import { ArtistSection } from "./components/ArtistSection";
import { MediaGallerySection } from "./components/MediaGallerySection";
import { VenueInfoSection } from "./components/VenueInfoSection";
import { AnnouncementsSection } from "./components/AnnouncementsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      <HeroSection />
      <TicketSection />
      <EventDetailsSection />
      <ArtistSection />
      <MediaGallerySection />
      <VenueInfoSection />
      <AnnouncementsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
}
