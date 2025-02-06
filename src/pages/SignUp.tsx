
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { useSignUp } from "@/hooks/use-signup";
import type { SignUpFormData } from "@/types/auth";

export default function SignUp() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const { isLoading, handleSignUp } = useSignUp();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp({ email, password, organizationName });
  };

  return (
    <AuthContainer>
      <AuthLogo />
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-md mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">Create Your Organization</h1>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="organizationName"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
              placeholder="Enter your organization name"
              disabled={isLoading}
              className="w-full min-h-[44px]"
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
              className="w-full min-h-[44px]"
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
              className="w-full min-h-[44px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full min-h-[44px] mt-6"
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
