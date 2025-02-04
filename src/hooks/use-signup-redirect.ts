
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
      // Check if user exists
      const { data, error } = await supabase.auth.admin.listUsers({
        filters: {
          email: email
        }
      });

      if (error) {
        throw error;
      }

      // If user exists, redirect to signin, otherwise to signup
      const route = data.users.length > 0 ? 'signin' : 'signup';
      navigate(`/${route}?email=${encodeURIComponent(email)}`);
      
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
