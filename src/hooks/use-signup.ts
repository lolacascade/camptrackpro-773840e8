
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { SignUpFormData } from "@/types/auth";

const validatePassword = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters long`);
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');

  return errors;
};

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = (data: SignUpFormData) => {
    if (!data.email || !data.password || !data.organizationName) {
      throw new Error('Please fill in all required fields');
    }

    const passwordErrors = validatePassword(data.password);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors.join('\n'));
    }

    if (!data.email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    if (data.organizationName.trim().length < 2 || data.organizationName.trim().length > 100) {
      throw new Error('Organization name must be between 2 and 100 characters');
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      validateForm(data);

      // Try to sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            organization_name: data.organizationName.trim()
          }
        }
      });

      if (signUpError) {
        // Parse error body if it exists
        let errorBody;
        try {
          errorBody = JSON.parse(signUpError.body as string);
        } catch {
          errorBody = null;
        }
        
        // Check for user exists error in different formats
        if (
          signUpError.message === "User already registered" || 
          errorBody?.code === "user_already_exists" ||
          (typeof signUpError === 'object' && 
           'error' in signUpError && 
           signUpError.error === 'user_already_exists')
        ) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
          navigate('/signin?email=' + encodeURIComponent(data.email));
          return;
        }
        throw signUpError;
      }

      if (!signUpData.user) throw new Error('Signup failed - no user data returned');

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (signInError) throw signInError;

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: { email: data.email }
        }
      );

      if (checkoutError) {
        console.error('Checkout error:', checkoutError);
        throw checkoutError;
      }

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
        return;
      }

      throw new Error('Failed to create checkout session');
    } catch (error: any) {
      console.error('Signup process error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignUp
  };
}
