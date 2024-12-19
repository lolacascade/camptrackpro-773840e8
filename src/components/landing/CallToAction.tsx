import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-heading-medium font-bold mb-8">
          Start Managing Your Park the Smart Way
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 text-[#0D1D1F] w-full sm:w-auto text-body-large"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/contact')}
            className="border-white text-white hover:bg-white/10 w-full sm:w-auto text-body-large"
          >
            Request a Demo
            <PlayCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}