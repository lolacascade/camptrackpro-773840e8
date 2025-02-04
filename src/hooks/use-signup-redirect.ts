
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useSignupRedirect() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (email: string) => {
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
      // Try to sign in with magic link - this will fail with a specific error if user doesn't exist
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false // This ensures we only check if user exists
        }
      });

      // User doesn't exist - redirect to signup
      if (error?.message?.includes('Email not confirmed')) {
        navigate(`/signup?email=${encodeURIComponent(email)}`);
      } else {
        // User exists - redirect to signin
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      }
      
    } catch (error: any) {
      console.error('Error checking email:', error);
      // If we can't check (which is likely due to permissions), default to signup
      navigate(`/signup?email=${encodeURIComponent(email)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignup,
  };
}
