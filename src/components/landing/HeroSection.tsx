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
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start bg-[#0D1D1F] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16 w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-white">Your RV Park, </span>
            <span className="text-[#C0CCAB]">Simplified with AI</span>
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
          Automate tasks, track maintenance, and gain insights with our AI-powered management tool.
        </p>
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="text-[#0D1D1F] bg-white hover:bg-white/90 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 h-auto transition-all duration-300"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <RevenueBreakdown />
      </div>
    </div>
  );
}