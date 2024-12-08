import { HeroSection } from "@/components/landing/HeroSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Login() {
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
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PainPointsSection />
      
      {/* Testimonials Section */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Marina Operators Say</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card className="p-8 text-center">
                  <p className="text-xl mb-6">"DockEase has transformed the way we operate. It's like having an extra team member!"</p>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent mr-4" />
                    <div className="text-left">
                      <p className="font-semibold">John Smith</p>
                      <p className="text-sm text-muted-foreground">Harbor Marina</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="p-8 text-center">
                  <p className="text-xl mb-6">"We've seen a 30% increase in efficiency since implementing DockEase."</p>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent mr-4" />
                    <div className="text-left">
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Sunset Bay Marina</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Small Marina",
                price: "199",
                features: ["Up to 50 slips", "Basic reporting", "Email support", "Mobile app access"]
              },
              {
                title: "Medium Marina",
                price: "399",
                features: ["Up to 150 slips", "Advanced reporting", "Priority support", "API access"]
              },
              {
                title: "Large Marina",
                price: "699",
                features: ["Unlimited slips", "Custom reporting", "24/7 support", "White-label options"]
              }
            ].map((plan) => (
              <Card key={plan.title} className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold mb-4">${plan.price}<span className="text-lg font-normal">/mo</span></div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <ChevronRight className="mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">Select Plan</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-semibold">Ready to revolutionize your marina?</p>
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="w-full sm:w-auto"
          >
            Try DockEase for free
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}