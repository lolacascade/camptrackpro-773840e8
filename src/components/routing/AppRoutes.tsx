import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import CustomerDetails from "@/pages/CustomerDetails";
import Assets from "@/pages/Assets";
import Bookings from "@/pages/Bookings";
import Maintenance from "@/pages/Maintenance";
import Settings from "@/pages/Settings";
import Financials from "@/pages/Financials";
import MarinaMap from "@/pages/MarinaMap";
import OrganizationSetup from "@/pages/OrganizationSetup";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes under /app */}
        <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/app/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/app/customers/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
        <Route path="/app/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
        <Route path="/app/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/app/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
        <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/app/financials" element={<ProtectedRoute><Financials /></ProtectedRoute>} />
        <Route path="/app/map" element={<ProtectedRoute><MarinaMap /></ProtectedRoute>} />
        <Route path="/app/organization-setup" element={<ProtectedRoute><OrganizationSetup /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}