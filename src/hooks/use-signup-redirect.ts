
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
      // Try to sign in with password - we'll use a dummy password since we just want to check if user exists
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy-password-for-check'
      });

      console.log('Auth response error:', error); // Add logging to help debug

      // "Invalid login credentials" means the password was wrong but email exists
      // Any other error means the user doesn't exist (or another error occurred)
      if (error?.message === 'Invalid login credentials') {
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      } else {
        navigate(`/signup?email=${encodeURIComponent(email)}`);
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
