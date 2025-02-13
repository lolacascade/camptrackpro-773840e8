
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
      const { data, error } = await supabase.functions.invoke('check-email-exists', {
        body: { email }
      });

      if (error) throw error;

      // Force boolean comparison and add debug logging
      console.log('Email check response:', data);
      const exists = data?.exists === true;
      console.log('Exists evaluation:', exists);

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
