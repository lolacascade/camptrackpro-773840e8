
import { type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/pages/Assets";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";

// Wrap each element with AuthProvider after router context is available
const withAuth = (element: React.ReactNode) => (
  <AuthProvider>{element}</AuthProvider>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: withAuth(<SignIn />),
  },
  {
    path: "/signin",
    element: withAuth(<SignIn />),
  },
  {
    path: "/signup",
    element: withAuth(<SignUp />),
  },
  {
    path: "/app",
    element: withAuth(
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/app/assets",
    element: withAuth(
      <ProtectedRoute>
        <Layout>
          <Assets />
        </Layout>
      </ProtectedRoute>
    ),
  }
];

export default routes;
