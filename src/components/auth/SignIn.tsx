import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';

export function SignIn() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Welcome Back
      </h1>
      
      <Auth
        supabaseClient={supabase}
        view="sign_in"
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
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign In',
              loading_button_label: 'Signing in...',
              password_input_placeholder: 'Your password',
              email_input_placeholder: 'Your email address',
              link_text: "Don't have an account? Sign up"
            }
          },
        }}
      />
    </div>
  );
}