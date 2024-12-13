import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    // Persistent session handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_IN') {
        // Store session in localStorage for persistence
        localStorage.setItem('supabase-session', JSON.stringify(currentSession));
        
        const from = location.state?.from?.pathname || '/app';
        navigate(from, { replace: true });
      }

      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('supabase-session');
      }

      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been successfully reset.",
        });
      }
    });

    // Check for existing session on mount
    const savedSession = localStorage.getItem('supabase-session');
    if (savedSession && !session) {
      const parsedSession = JSON.parse(savedSession);
      if (parsedSession?.access_token) {
        supabase.auth.setSession(parsedSession);
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [session, navigate, location.state?.from?.pathname, toast]);

  // If already authenticated, redirect to app
  useEffect(() => {
    if (!isLoading && session) {
      const from = location.state?.from?.pathname || '/app';
      navigate(from, { replace: true });
    }
  }, [session, isLoading, navigate, location]);

  // Show loading state
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
            providers={[]}
            redirectTo={`${window.location.origin}/app`}
            magicLink={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Password',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}