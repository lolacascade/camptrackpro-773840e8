import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          throw error;
        }

        if (!currentSession) {
          // Only redirect to login if there's no session
          navigate('/login', { replace: true });
          toast({
            title: "Authentication required",
            description: "Please sign in to continue.",
            variant: "destructive",
          });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Only redirect on actual auth errors
        navigate('/login', { replace: true });
        toast({
          title: "Authentication error",
          description: "There was a problem verifying your session. Please sign in again.",
          variant: "destructive",
        });
      }
    };

    // Only check auth if there's no session
    if (!session) {
      checkAuth();
    } else {
      setIsLoading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT') {
        navigate('/login', { replace: true });
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if we have a session
  if (!session) {
    return null;
  }

  return <>{children}</>;
}