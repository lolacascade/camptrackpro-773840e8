import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function CallToAction() {
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
    <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-[#0D1D1F] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/52524eca-7cc6-4984-9c5e-733e28b89d79.png')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-heading-medium lg:text-lg:heading-medium font-bold mb-6 sm:mb-8 text-foreground-light">
            Start Managing Your Park the Smart Way
          </h2>
          
          <div className="max-w-md mx-auto">
            <div className="bg-foreground-light rounded-lg p-1 flex gap-2">
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
        </div>
      </div>
    </section>
  );
}