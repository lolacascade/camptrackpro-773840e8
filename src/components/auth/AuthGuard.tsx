import { useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

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
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setIsSessionChecked(true);
        
        if (!currentSession) {
          // If no session, redirect to login
          window.location.href = '/login';
        }
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
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/login';
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