import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Card className="w-[400px] p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome to DockEase</h1>
          <p className="text-secondary">Please sign in to continue</p>
        </div>
        <Button 
          className="w-full" 
          onClick={handleLogin}
        >
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
}