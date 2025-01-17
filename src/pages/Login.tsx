import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { AuthLoading } from '@/components/auth/AuthLoading';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { useAuthState } from '@/hooks/use-auth-state';

export default function Login() {
  const location = useLocation();
  const { session, isLoading } = useSessionContext();
  const fromPath = location.state?.from?.pathname || '/app';
  
  useAuthState(fromPath);

  useEffect(() => {
    if (!isLoading && session) {
      // If already authenticated, redirect to the intended page
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    }
  }, [session, isLoading, navigate, location]);

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <div className="min-h-screen bg-[#0D1D1F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <AuthLogo />
        
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