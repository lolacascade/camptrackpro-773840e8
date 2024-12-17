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
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-[#0D1D1F] pt-32 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          Simplify RV Park Management.
          <br />
          Maximize Efficiency.
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          CampTrackPro empowers RV park operators to streamline operations,
          boost revenue, and enhance camper satisfaction.
        </p>
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="text-[#0D1D1F] bg-white hover:bg-white/90 text-lg px-8 py-6 h-auto"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <RevenueBreakdown />
      </div>
    </div>
  );
}