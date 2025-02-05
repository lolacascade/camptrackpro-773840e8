
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
    async function checkOrganization() {
      if (session?.user) {
        // Using .select() instead of .single() to handle multiple results
        const { data: orgRoles, error } = await supabase
          .from('organization_roles')
          .select('organization_id')
          .eq('user_id', session.user.id)
          .limit(1);

        if (error) {
          console.error('Error checking organization:', error);
          setHasOrganization(false);
        } else {
          // Check if we have at least one organization role
          setHasOrganization(orgRoles && orgRoles.length > 0);
        }
      }
      setIsLoading(false);
    }

    checkOrganization();
  }, [session]);

  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user has no organization, redirect to dashboard where they'll be prompted to create one
  if (!hasOrganization) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
