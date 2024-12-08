import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/components/layout/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      }
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  // Get the site URL without any trailing slashes
  const siteUrl = window.location.origin.replace(/\/$/, '');
  const redirectTo = `${siteUrl}/dashboard`;
  
  console.log('Site URL:', siteUrl);
  console.log('Redirect URL:', redirectTo);

  return (
    <div className="min-h-screen bg-[#FFF] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#133134] mb-2">Welcome Back</h1>
            <p className="text-[#3E4238]">Sign in to manage your marina</p>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#133134',
                    brandAccent: '#3E4238',
                  }
                }
              }
            }}
            providers={['google']}
            redirectTo={redirectTo}
            onError={(error) => {
              console.error('Auth error:', error);
              toast({
                title: "Authentication Error",
                description: error.message,
                variant: "destructive"
              });
            }}
          />
        </Card>
      </div>
      <Footer />
    </div>
  );
}