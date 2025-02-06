
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Record reset attempt
      const { error: rateLimitError } = await supabase
        .from('password_reset_attempts')
        .insert([{ 
          email,
          ip_address: 'client', // IP is captured by RLS
          successful: false
        }]);

      if (rateLimitError) {
        throw new Error('Too many password reset attempts. Please try again later.');
      }

      // Use the hash-based URL for the redirect
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#/reset-password`,
      });

      if (error) throw error;

      // Update attempt as successful
      await supabase
        .from('password_reset_attempts')
        .update({ successful: true })
        .eq('email', email)
        .order('attempt_time', { ascending: false })
        .limit(1);

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthLogo />
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              disabled={isLoading}
              className="min-h-[44px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Remember your password?{' '}
            <Link 
              to="/signin"
              className="text-[#0D1D1F] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthContainer>
  );
}

