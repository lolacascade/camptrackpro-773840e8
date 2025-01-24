import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function AuthForm() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && mode === 'signup' && session?.user) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              company_name: companyName,
              phone: phone,
              role: 'admin'
            })
            .eq('id', session.user.id);

          if (error) throw error;
        } catch (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error",
            description: "Failed to save company information. Please try again.",
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [companyName, phone, mode, toast]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === 'signup' ? 'Create an Account' : 'Welcome Back'}
      </h1>
      
      {mode === 'signup' && (
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="mt-1"
            />
          </div>
        </div>
      )}

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