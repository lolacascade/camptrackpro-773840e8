import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading } = useSessionContext();
  const location = useLocation();

  useEffect(() => {
    const checkAndSetSession = async () => {
      const { data: { session: persistedSession } } = await supabase.auth.getSession();
      if (!persistedSession) {
        console.log('No persisted session found');
      } else {
        console.log('Persisted session found:', persistedSession.user.id);
      }
    };

    checkAndSetSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      console.log('Auth state changed:', _event, currentSession?.user?.id);
      
      if (_event === 'SIGNED_OUT') {
        // Only redirect if we're actually signed out
        window.location.href = '/login';
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D1D1F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}