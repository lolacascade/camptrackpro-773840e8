import { useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { session, isLoading } = useSessionContext();
  const location = useLocation();
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          toast.error("Authentication error. Please log in again.");
          window.location.href = '/login';
          return;
        }

        if (!currentSession) {
          console.log('No active session found');
          setIsSessionChecked(true);
          return;
        }

        // Attempt to refresh the session if we have one
        const { data: { session: refreshedSession }, error: refreshError } = 
          await supabase.auth.refreshSession();

        if (refreshError) {
          console.error('Session refresh error:', refreshError);
          toast.error("Your session has expired. Please log in again.");
          window.location.href = '/login';
          return;
        }

        setIsSessionChecked(true);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsSessionChecked(true);
      }
    };

    if (!session && !isLoading) {
      checkSession();
    } else {
      setIsSessionChecked(true);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/login';
      }
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session, isLoading]);

  if (isLoading || !isSessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D1D1F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}