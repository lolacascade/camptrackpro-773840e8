import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Dashboard from "@/pages/Dashboard";
import MarinaMap from "@/pages/MarinaMap";
import Customers from "@/pages/Customers";
import CustomerDetails from "@/pages/CustomerDetails";
import Assets from "@/pages/Assets";
import Maintenance from "@/pages/Maintenance";
import Settings from "@/pages/Settings";
import Financials from "@/pages/Financials";

const AppLayout = () => (
  <ProtectedRoute>
    <Layout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="map" element={<MarinaMap />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route path="assets" element={<Assets />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="financials" element={<Financials />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </Layout>
  </ProtectedRoute>
);

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - accessible to all users */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      
      {/* Protected app routes */}
      <Route path="/app/*" element={<AppLayout />} />
      
      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}