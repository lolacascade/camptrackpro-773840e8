
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization } from "@/contexts/OrganizationContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isOrgLoading, organizationId, accountId } = useOrganization();
  const location = useLocation();
  const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(location.pathname);

  // Show loading state while checking auth or organization
  if ((isAuthLoading || isOrgLoading) && !isPublicRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to signin
  if (!isAuthLoading && !user && !isPublicRoute) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated but no organization/account access, redirect to app
  if (!isAuthLoading && !isOrgLoading && user && !organizationId && !isPublicRoute) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
