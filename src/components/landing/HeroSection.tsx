import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RevenueBreakdown } from "@/components/dashboard/RevenueBreakdown";

export function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start bg-[#0D1D1F] px-4 py-16 md:py-32">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
        <div className="mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">CampTrackPro</h1>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
          Simplify RV Park Management.
          <br className="hidden sm:block" />
          Maximize Efficiency.
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          CampTrackPro empowers RV park operators to streamline operations,
          boost revenue, and enhance camper satisfaction.
        </p>
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="text-[#0D1D1F] bg-white hover:bg-white/90 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto transition-all duration-300"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="w-full max-w-[90vw] lg:max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8">
        <RevenueBreakdown />
      </div>
    </div>
  );
}