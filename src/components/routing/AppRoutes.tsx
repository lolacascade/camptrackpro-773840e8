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
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes with app layout */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/customers" element={<Customers />} />
        <Route path="/app/customers/:id" element={<CustomerDetails />} />
        <Route path="/app/assets" element={<Assets />} />
        <Route path="/app/bookings" element={<Bookings />} />
        <Route path="/app/maintenance" element={<Maintenance />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/financials" element={<Financials />} />
        <Route path="/app/map" element={<MarinaMap />} />
        <Route path="/app/organization-setup" element={<OrganizationSetup />} />
      </Route>
    </Routes>
  );
}