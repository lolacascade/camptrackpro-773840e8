
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const session = useSession();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasOrganization, setHasOrganization] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (!currentSession) {
          setIsLoading(false);
          return;
        }

        // Check organization membership
        const { data: orgRoles, error } = await supabase
          .from('organization_roles')
          .select('organization_id')
          .eq('user_id', currentSession.user.id)
          .limit(1);

        if (error) {
          console.error('Error checking organization:', error);
          setHasOrganization(false);
        } else {
          setHasOrganization(orgRoles && orgRoles.length > 0);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Session check failed:', error);
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if no session
  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If user has no organization, redirect to dashboard
  if (!hasOrganization) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
