import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function SignUp() {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const handleSignUp = async (formData: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            company_name: companyName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      console.error('Error during signup:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Create an Account
      </h1>
      
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
            required
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
            required
          />
        </div>
      </div>

      <Auth
        supabaseClient={supabase}
        view="sign_up"
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
        handleSubmit={handleSignUp}
        localization={{
          variables: {
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              button_label: 'Sign Up',
              loading_button_label: 'Signing up...',
              password_input_placeholder: 'Create a password',
              email_input_placeholder: 'Your email address',
              link_text: 'Already have an account? Sign in'
            }
          },
        }}
      />
    </div>
  );
}