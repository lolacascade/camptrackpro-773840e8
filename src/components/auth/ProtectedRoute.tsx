import { AuthGuard } from "./AuthGuard";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <AuthGuard>{children}</AuthGuard>;
}