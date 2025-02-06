
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
      if (!session) {
        navigate('/signin', { replace: true });
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, currentSession: Session | null) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (event === 'SIGNED_IN' && currentSession) {
        navigate(fromPath, { replace: true });
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }

      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        navigate('/signin', { replace: true });
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }

      // Handle token refresh errors
      if (event === 'TOKEN_REFRESHED' && !currentSession) {
        console.log('Token refresh failed, redirecting to signin');
        navigate('/signin', { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, fromPath, toast]);
}
