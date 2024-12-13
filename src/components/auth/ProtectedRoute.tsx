import { useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading } = useSessionContext();
  const location = useLocation();
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const [persistedSession, setPersistedSession] = useState(null);

  useEffect(() => {
    const checkAndSetSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Checking persisted session:', currentSession?.user?.id);
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
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      if (event === 'SIGNED_OUT') {
        // Only redirect on explicit sign out
        window.location.href = '/login';
      } else if (event === 'SIGNED_IN') {
        // Update the persisted session on sign in
        setPersistedSession(currentSession);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading state while checking session
  if (isLoading || !isSessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D1D1F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check both session contexts to ensure we don't lose authentication
  if (!session && !persistedSession) {
    console.log('No valid session found, redirecting to login');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}