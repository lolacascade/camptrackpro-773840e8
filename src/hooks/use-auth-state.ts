
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuthState(fromPath: string = '/app') {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // If we have a session, navigate to the intended path
        console.log('Existing session found, navigating to:', fromPath);
        navigate(fromPath, { replace: true });
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, currentSession: Session | null) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (event === 'SIGNED_IN' && currentSession) {
        console.log('User signed in, navigating to:', fromPath);
        navigate(fromPath, { replace: true });
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }

      if (event === 'SIGNED_OUT') {
        console.log('User signed out, navigating to signin');
        navigate('/signin', { replace: true });
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      // Handle token refresh
      if (event === 'TOKEN_REFRESHED' && currentSession) {
        // Stay on current page if token was refreshed successfully
        console.log('Token refreshed successfully');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, fromPath, toast]);
}
