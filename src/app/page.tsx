import { Header } from "@/components/Header";
import { HeroVideo } from "@/components/HeroVideo";
import { BookingWidget } from "@/components/BookingWidget";
import { RichTextIntro } from "@/components/RichTextIntro";
import { TheHotelSection } from "@/components/TheHotelSection";
import { AccommodationGrid } from "@/components/AccommodationGrid";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SunshineSection } from "@/components/SunshineSection";
import { InternationalPresence } from "@/components/InternationalPresence";
import { TimeToUnwind } from "@/components/TimeToUnwind";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroVideo />
        <BookingWidget />
        <RichTextIntro />
        <TheHotelSection />
        <AccommodationGrid />
        <FeaturedProperties />
        <ServicesSection />
        <WhyChooseUs />
        <SunshineSection />
        <InternationalPresence />
        <TimeToUnwind />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
