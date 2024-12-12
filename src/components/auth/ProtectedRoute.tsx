import { useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from '@supabase/auth-helpers-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading } = useSessionContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}