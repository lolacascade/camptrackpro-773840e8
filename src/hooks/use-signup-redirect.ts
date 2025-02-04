
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
      // Call the Edge Function to check if email exists
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/check-email-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({ email })
      });

      const { exists, error } = await response.json();
      
      if (error) throw new Error(error);

      // If email exists, redirect to sign in, otherwise to sign up
      if (exists) {
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      } else {
        navigate(`/signup?email=${encodeURIComponent(email)}`);
      }
      
    } catch (error: any) {
      console.error('Error checking email:', error);
      toast({
        title: "Error",
        description: "An error occurred while checking the email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignup,
  };
}
