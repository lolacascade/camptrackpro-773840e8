import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { session, isLoading } = useSessionContext();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && currentSession) {
        const from = location.state?.from?.pathname || '/app';
        navigate(from, { replace: true });
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }

      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('supabase-session');
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'USER_UPDATED') {
        console.log('User profile updated');
      }

      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password recovery",
          description: "Check your email for password reset instructions.",
        });
      }

      // Handle authentication errors
      if (event === 'USER_DELETED' || event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.state?.from?.pathname, toast]);

  useEffect(() => {
    if (!isLoading && session) {
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    }
  }, [session, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1D1F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-white text-sm">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1D1F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-white">Camp</span>
              <span className="text-white">Track</span>
              <span className="text-[#C0CCAB]">Pro</span>
            </h1>
          </Link>
          <p className="text-gray-400">Manage your RV park with ease</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#C0CCAB',
                    brandAccent: '#b3c196',
                    brandButtonText: '#0D1D1F',
                    defaultButtonBackground: '#E5E7EB',
                    defaultButtonBackgroundHover: '#D1D5DB',
                  },
                  space: {
                    inputPadding: '12px',
                    buttonPadding: '12px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '6px',
                    buttonBorderRadius: '6px',
                    inputBorderRadius: '6px',
                  },
                },
              },
              style: {
                button: {
                  fontSize: '16px',
                  fontWeight: '500',
                },
                input: {
                  fontSize: '16px',
                },
                label: {
                  fontSize: '14px',
                  color: '#374151',
                },
                anchor: {
                  color: '#0D1D1F',
                  textDecoration: 'none',
                  fontWeight: '500',
                },
                message: {
                  color: '#EF4444',
                  fontSize: '14px',
                  margin: '8px 0',
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/app`}
            magicLink={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Password',
                  button_label: 'Sign In',
                  loading_button_label: 'Signing in...',
                  password_input_placeholder: 'Your password',
                  email_input_placeholder: 'Your email address',
                  link_text: "Don't have an account? Sign up",
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Password',
                  button_label: 'Sign Up',
                  loading_button_label: 'Signing up...',
                  password_input_placeholder: 'Create a password',
                  email_input_placeholder: 'Your email address',
                  link_text: 'Already have an account? Sign in',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}