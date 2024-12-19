import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-white text-[#0D1D1F] border border-[rgba(0,0,0,0.1)] rounded-lg mx-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-heading-medium font-bold mb-8">
          Start Managing Your Park the Smart Way
        </h2>
        
        <Button 
          size="lg"
          onClick={() => navigate('/login')}
          className="bg-[#0D1D1F] hover:bg-[#0D1D1F]/90 text-white w-full sm:w-auto text-body-large"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}