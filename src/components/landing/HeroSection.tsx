import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
  );
}