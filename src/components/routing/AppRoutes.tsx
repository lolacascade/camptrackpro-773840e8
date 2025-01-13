import { Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { Index } from "@/pages/Index";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { Customers } from "@/pages/Customers";
import { CustomerDetails } from "@/pages/CustomerDetails";
import { Assets } from "@/pages/Assets";
import { Maintenance } from "@/pages/Maintenance";
import { Settings } from "@/pages/Settings";
import { Financials } from "@/pages/Financials";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { TermsOfService } from "@/pages/TermsOfService";

export const AppRoutes = () => {
  const session = useSession();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/customers" element={<Customers />} />
          <Route path="/app/customers/:id" element={<CustomerDetails />} />
          <Route path="/app/assets" element={<Assets />} />
          <Route path="/app/maintenance" element={<Maintenance />} />
          <Route path="/app/settings" element={<Settings />} />
          <Route path="/app/financials" element={<Financials />} />
        </Route>
      </Route>

      {/* Catch all route - redirect to home or dashboard based on auth status */}
      <Route 
        path="*" 
        element={
          session ? (
            <Navigate to="/app/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};