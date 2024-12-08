import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RevenueBreakdown } from "@/components/dashboard/RevenueBreakdown";

export function HeroSection() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-[#FFF] pt-32 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-[#0D1D1F] text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          Streamline Your Marina Operations
        </h1>
        <p className="text-[#BFC6B3] text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          DockEase empowers marina operators to streamline operations,
          boost revenue, and enhance customer satisfaction.
        </p>
        <Button 
          size="lg" 
          onClick={handleLogin}
          className="text-[#FFF] bg-[#0D1D1F] hover:bg-[#0D1D1F]/90 text-lg px-8 py-6 h-auto"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-[#FFF] rounded-xl shadow-lg border border-[#BFC6B3]/20 p-8">
        <RevenueBreakdown />
      </div>

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFF] border-t border-[#BFC6B3]/20 md:hidden">
        <Button 
          size="lg" 
          onClick={handleLogin}
          className="w-full text-[#FFF] bg-[#0D1D1F] hover:bg-[#0D1D1F]/90"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}