
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuthState(fromPath: string = '/app') {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(fromPath, { replace: true });
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, currentSession: Session | null) => {
      if (event === 'SIGNED_IN' && currentSession) {
        navigate(fromPath, { replace: true });
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }

      if (event === 'SIGNED_OUT') {
        navigate('/signin', { replace: true });
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'TOKEN_REFRESHED' && currentSession) {
        // Stay on current page if token was refreshed successfully
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, fromPath, toast]);
}
