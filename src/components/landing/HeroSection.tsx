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
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start bg-secondary px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16 w-full">
        <div className="mb-8 sm:mb-10 mt-8 sm:mt-12 md:mt-16">
          <h1 className="text-heading-large lg:text-lg:heading-large font-bold mb-6">
            <span className="text-foreground-light">Your RV Park, </span>
            <span className="text-primary">Simplified with AI</span>
          </h1>
        </div>
        
        <p className="text-subheading lg:text-lg:subheading text-foreground-light mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-3xl mx-auto leading-relaxed">
          Streamline daily operations, stay on top of maintenance, and uncover insights with an intuitive AI-powered management tool. Simplify workflows, reduce manual effort, and focus on what matters—delivering a great experience for your guests.
        </p>

        <div className="max-w-md mx-auto bg-foreground-light rounded-lg p-1 flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 text-body-large lg:text-lg:body-large placeholder:text-gray-400"
          />
          <Button 
            onClick={handleSignUp}
            disabled={isLoading}
            className="bg-primary hover:bg-primary-light text-secondary font-medium whitespace-nowrap px-6 text-body-large lg:text-lg:body-large"
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                Sign up for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-6xl mx-auto bg-foreground-light rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
        <RevenueBreakdown />
      </div>
    </div>
  );
}