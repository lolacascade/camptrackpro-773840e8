
import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    ),
  },
  {
    path: "/signin",
    element: (
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    ),
  },
  {
    path: "/app",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/app/assets",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Assets />
        </ProtectedRoute>
      </AuthProvider>
    ),
  }
];

export default routes;
