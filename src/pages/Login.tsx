import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Anchor, Shield, Gauge, ChevronRight, BarChart3, MessageSquare, Calendar, DollarSign } from "lucide-react";
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
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Simplify Marina Management.
            <br />
            Maximize Efficiency.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            DockEase empowers marina operators to streamline operations, boost revenue, and enhance customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90"
            >
              Get Started Today
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 h-auto text-white border-white hover:bg-white/10"
            >
              See How It Works
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="py-24 bg-accent">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-8">
            <Card className="p-6 bg-background/60 backdrop-blur hover:scale-105 transition-transform">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Revenue Management</h3>
              <p className="text-muted-foreground">
                Track and optimize your marina's revenue streams
              </p>
            </Card>
            <Card className="p-6 bg-background/60 backdrop-blur hover:scale-105 transition-transform">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Maintenance Tracking</h3>
              <p className="text-muted-foreground">
                Never miss important maintenance tasks
              </p>
            </Card>
            <Card className="p-6 bg-background/60 backdrop-blur hover:scale-105 transition-transform">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Communication</h3>
              <p className="text-muted-foreground">
                Stay connected with your boaters
              </p>
            </Card>
            <Card className="p-6 bg-background/60 backdrop-blur hover:scale-105 transition-transform">
              <DollarSign className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financial Reports</h3>
              <p className="text-muted-foreground">
                Get insights into your business
              </p>
            </Card>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Common Challenges We Solve</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ChevronRight className="mt-1 mr-2 text-primary" />
                <span>Struggling to manage slip availability efficiently?</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mt-1 mr-2 text-primary" />
                <span>Losing track of maintenance schedules?</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mt-1 mr-2 text-primary" />
                <span>Difficulty maximizing marina revenue?</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mt-1 mr-2 text-primary" />
                <span>Limited tools to communicate with boaters?</span>
              </li>
            </ul>
            <Button className="mt-8" size="lg">
              Discover How DockEase Solves These Issues
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

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