import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';

export function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
      </h1>
      <Auth
        supabaseClient={supabase}
        view={mode === 'signup' ? 'sign_up' : 'sign_in'}
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
              magic_link_text: 'Send a magic link email',
              forgot_password_text: 'Forgot password?'
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign Up',
              loading_button_label: 'Signing up...',
              password_input_placeholder: 'Create a password',
              email_input_placeholder: 'Your email address',
              link_text: 'Already have an account? Sign in',
              magic_link_text: 'Send a magic link email',
              forgot_password_text: 'Forgot password?'
            },
          },
        }}
      />
    </div>
  );
}