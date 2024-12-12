import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { PainPointsSection } from '@/components/landing/PainPointsSection';
import { Footer } from '@/components/layout/Footer';

export default function Index() {
  const navigate = useNavigate();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      navigate('/app');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <PainPointsSection />
      <Footer />
    </div>
  );
}