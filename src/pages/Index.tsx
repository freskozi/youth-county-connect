import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { NewsSection } from "@/components/NewsSection";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
        <AboutSection />
        <GallerySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
