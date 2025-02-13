
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [hasOrganization, setHasOrganization] = useState(false);

  useEffect(() => {
    async function checkOrganization() {
      if (!user) return;

      try {
        const { data: orgRoles, error } = await supabase
          .from('organization_roles')
          .select('organization_id')
          .eq('user_id', user.id)
          .limit(1);

        if (error) {
          console.error('Error checking organization:', error);
          setHasOrganization(false);
        } else {
          setHasOrganization(orgRoles && orgRoles.length > 0);
        }
      } catch (error) {
        console.error('Organization check failed:', error);
        setHasOrganization(false);
      }
    }

    if (user) {
      checkOrganization();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!hasOrganization) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
