import { HeroSection } from '@/components/landing/HeroSection';
import { PainPointsSection } from '@/components/landing/PainPointsSection';
import { FAQSection } from '@/components/faq/FAQSection';
import { Footer } from '@/components/layout/Footer';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <PainPointsSection />
        <div className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <FAQSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}