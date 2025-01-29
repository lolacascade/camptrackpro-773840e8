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
        const { data: orgRoles } = await supabase
          .from('organization_roles')
          .select('organization_id')
          .single();

        setHasOrganization(!!orgRoles);
      }
      setIsLoading(false);
    }

    checkOrganization();
  }, [session]);

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated but has no organization, redirect to organization setup
  // unless they're already on the organization setup page
  if (!hasOrganization && !location.pathname.includes('/organization-setup')) {
    return <Navigate to="/app/organization-setup" replace />;
  }

  return <>{children}</>;
}