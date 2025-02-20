
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
        const { data: orgData, error } = await supabase
          .from('user_organizations')
          .select('organization_id')
          .eq('user_id', user.id)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error checking organization:', error);
          setHasOrganization(false);
        } else {
          setHasOrganization(!!orgData?.organization_id);
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

  if (isAuthLoading || isCheckingOrg) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (hasOrganization === false && location.pathname !== '/app') {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
