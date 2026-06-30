/// <reference types="react" />
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FocusSection from "@/components/FocusSection";
import VisionSection from "@/components/VisionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FocusSection />
        <VisionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
