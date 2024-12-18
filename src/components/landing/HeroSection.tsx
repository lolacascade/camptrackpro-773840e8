import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RevenueBreakdown } from "@/components/dashboard/RevenueBreakdown";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function HeroSection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a magic link to sign in.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

        <div className="max-w-md mx-auto bg-white rounded-lg p-1 flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 text-base placeholder:text-gray-400"
          />
          <Button 
            onClick={handleSignUp}
            disabled={isLoading}
            className="bg-[#C0CCAB] hover:bg-[#b3c196] text-[#0D1D1F] font-medium whitespace-nowrap px-6"
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                Sign up for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <RevenueBreakdown />
      </div>
    </div>
  );
}