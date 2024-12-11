import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/app');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0D1D1F] flex flex-col">
      <header className="p-6">
        <div className="text-xl font-bold text-white">
          <span className="text-primary">Dock</span>
          <span>Ease</span>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Manage Your Marina <br />
            <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Streamline your marina operations with our comprehensive management solution.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}