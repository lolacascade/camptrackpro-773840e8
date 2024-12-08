import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <PainPointsSection />
      <Footer />
    </div>
  );
}