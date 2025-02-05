
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthLogo } from "@/components/auth/AuthLogo";

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set email from URL parameter if present
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!email || !password || !companyName) {
        throw new Error('Please fill in all required fields');
      }

      // Password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Email validation
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Company name validation (matching DB constraint)
      if (companyName.trim().length < 2 || companyName.trim().length > 100) {
        throw new Error('Company name must be between 2 and 100 characters');
      }

      console.log('Starting signup process...', { email, companyName });

      // Attempt signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName.trim(),
          }
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      if (data?.user) {
        console.log('Signup successful:', data.user);
        
        // Since email verification is disabled, we can sign in directly
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          throw signInError;
        }

        toast({
          title: "Success",
          description: "Your account has been created successfully!",
        });
        
        // Navigate to main app
        navigate('/app');
      } else {
        throw new Error('Signup failed - no user data returned');
      }
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

  return (
    <AuthContainer>
      <AuthLogo />
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Your Organization</h1>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Enter your organization name"
              disabled={isLoading}
              className="w-full"
              minLength={2}
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              disabled={isLoading}
              minLength={6}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Organization"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
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
