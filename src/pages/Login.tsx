import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Anchor, Shield, Gauge } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            <span className="text-primary">Dock</span>
            <span className="text-secondary">Ease</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The Ultimate AI-Powered Marina Management Solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-background/60 backdrop-blur">
            <Anchor className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Dock Management</h3>
            <p className="text-muted-foreground">
              Efficiently manage your marina's docks and slips with our intelligent system.
            </p>
          </Card>

          <Card className="p-6 bg-background/60 backdrop-blur">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
            <p className="text-muted-foreground">
              Keep your marina secure with advanced monitoring and access control.
            </p>
          </Card>

          <Card className="p-6 bg-background/60 backdrop-blur">
            <Gauge className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-muted-foreground">
              Make data-driven decisions with comprehensive marina analytics.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="text-lg px-8 py-6 h-auto"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Sign in with Google to access your marina dashboard
          </p>
        </div>
      </div>
    </div>
  );
}