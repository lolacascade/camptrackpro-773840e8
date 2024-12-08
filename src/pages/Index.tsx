import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#133134] mb-6">
              Streamline Your Marina Operations
            </h1>
            <p className="text-xl text-[#3E4238] mb-12 max-w-2xl">
              DockEase empowers marina operators with powerful tools to manage slips,
              track maintenance, and boost revenue - all in one place.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-[#133134] hover:bg-[#133134]/90 text-white px-8 py-6 text-lg h-auto"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}