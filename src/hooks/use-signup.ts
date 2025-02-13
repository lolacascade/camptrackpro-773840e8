
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

  const checkExistingUser = async (email: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('check-email-exists', {
        body: { email }
      });

      if (error) throw error;
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      validateForm(data);

      // Check if user already exists
      const userExists = await checkExistingUser(data.email);
      if (userExists) {
        toast({
          title: "Account exists",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive",
        });
        navigate('/signin?email=' + encodeURIComponent(data.email));
        return;
      }

      // Create user without signing them in
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            organization_name: data.organizationName.trim()
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error('Signup failed - no user data returned');

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: { email: data.email }
        }
      );

      if (checkoutError) throw checkoutError;
      if (!checkoutData?.url) throw new Error('Failed to create checkout session');

      // Show success message before redirecting to Stripe
      toast({
        title: "Account created!",
        description: "Please complete your subscription setup.",
      });

      // Redirect to Stripe
      window.location.href = checkoutData.url;

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
