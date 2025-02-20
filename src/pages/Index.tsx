
import { HeroSection } from "@/components/landing/HeroSection";
import { KeyFeatures } from "@/components/landing/KeyFeatures";
import { BenefitsOfAI } from "@/components/landing/BenefitsOfAI";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { CallToAction } from "@/components/landing/CallToAction";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-secondary">
      <LandingHeader />
      <main>
        <HeroSection />
        <KeyFeatures />
        <BenefitsOfAI />
        <PainPointsSection />
        <ValueProposition />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
