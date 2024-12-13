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
  const [persistedSession, setPersistedSession] = useState(null);

  useEffect(() => {
    const checkAndSetSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setPersistedSession(currentSession);
        setIsSessionChecked(true);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsSessionChecked(true);
      }
    };

    checkAndSetSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_OUT') {
        window.location.href = '/login';
      } else if (event === 'SIGNED_IN') {
        setPersistedSession(currentSession);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading || !isSessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D1D1F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session && !persistedSession) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}