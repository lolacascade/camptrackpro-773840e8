
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthLogo } from "@/components/auth/AuthLogo";

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const validateInput = () => {
    if (!email.trim() || !password.trim()) {
      throw new Error('Please fill in all fields');
    }
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      validateInput();

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError) {
        toast({
          title: "Unable to sign in",
          description: "The email or password you entered is incorrect. Please try again.",
          variant: "default",
        });
        return;
      }

      if (signInData.user) {
        navigate('/app');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'An unexpected error occurred';
      
      if (error.message === 'Please fill in all fields' || 
          error.message === 'Please enter a valid email address') {
        errorMessage = error.message;
      }

      toast({
        title: "Notice",
        description: errorMessage,
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthLogo />
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Welcome Back</h1>
        
        <form onSubmit={handleSignIn} className="space-y-4">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={isLoading}
              className="min-h-[44px]"
            />
          </div>

          <Link 
            to="/forgot-password"
            className="text-sm text-[#0D1D1F] hover:underline block text-right"
          >
            Forgot your password?
          </Link>

          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link 
              to="/signup"
              className="text-[#0D1D1F] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthContainer>
  );
}
