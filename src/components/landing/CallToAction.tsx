import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-heading-medium font-bold mb-6 sm:mb-8 text-foreground-light leading-tight">
          Start Managing Your Park the Smart Way
        </h2>
        
        <div className="flex items-center justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary-light text-secondary text-base sm:text-lg md:text-body-large px-6 sm:px-8 py-2.5 sm:py-3 h-auto"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}