
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const location = useLocation();
  const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);
  const [isCheckingOrg, setIsCheckingOrg] = useState(true);

  useEffect(() => {
    async function checkOrganization() {
      if (!user) {
        setHasOrganization(false);
        setIsCheckingOrg(false);
        return;
      }

      try {
        // Check for session first
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No active session found');
          setHasOrganization(false);
          setIsCheckingOrg(false);
          return;
        }

        const { data: orgRoles, error } = await supabase
          .from('organization_roles')
          .select('organization_id')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error checking organization:', error);
          setHasOrganization(false);
        } else {
          setHasOrganization(!!orgRoles?.organization_id);
        }
      } catch (error) {
        console.error('Organization check failed:', error);
        setHasOrganization(false);
      } finally {
        setIsCheckingOrg(false);
      }
    }

    if (user) {
      checkOrganization();
    } else if (!isAuthLoading) {
      setIsCheckingOrg(false);
    }
  }, [user, isAuthLoading]);

  // Show loading state while checking auth or organization
  if (isAuthLoading || isCheckingOrg) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to signin
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Only redirect to /app if we've confirmed there's no organization AND we're not already on /app
  if (hasOrganization === false && location.pathname !== '/app') {
    return <Navigate to="/app" replace />;
  }

  // If we have an organization or we're on /app, render children
  return <>{children}</>;
}
