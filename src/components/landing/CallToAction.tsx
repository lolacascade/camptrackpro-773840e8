import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-heading-medium font-bold mb-8 text-[#0D1D1F]">
          Start Managing Your Park the Smart Way
        </h2>
        
        <div className="flex items-center justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-[#0D1D1F] text-body-large"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}