import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AuthLoading } from "./AuthLoading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login", { replace: true });
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}