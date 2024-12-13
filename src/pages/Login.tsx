import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from '@supabase/auth-helpers-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { session, isLoading } = useSessionContext();

  useEffect(() => {
    // If already authenticated, redirect to app
    if (!isLoading && session) {
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    }
  }, [session, isLoading, navigate, location]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1D1F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // If not authenticated, show login form
  return (
    <div className="min-h-screen bg-[#0D1D1F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">Dock</span>
            <span className="text-blue-400">Ease</span>
          </h1>
          <p className="text-gray-400">Manage your marina with ease</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0D1D1F',
                    brandAccent: '#1a3538',
                    brandButtonText: 'white',
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
              },
            }}
            redirectTo={`${window.location.origin}/app`}
          />
        </div>
      </div>
    </div>
  );
}