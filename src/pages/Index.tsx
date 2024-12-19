import { HeroSection } from '@/components/landing/HeroSection';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { KeyFeatures } from '@/components/landing/KeyFeatures';
import { BenefitsOfAI } from '@/components/landing/BenefitsOfAI';
import { CallToAction } from '@/components/landing/CallToAction';
import { FAQSection } from '@/components/faq/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { LandingHeader } from '@/components/landing/LandingHeader';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D1D1F]">
      <LandingHeader />
      <main className="flex-grow">
        <HeroSection />
        <ValueProposition />
        <KeyFeatures />
        <BenefitsOfAI />
        <div className="bg-[#0D1D1F] py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </div>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}