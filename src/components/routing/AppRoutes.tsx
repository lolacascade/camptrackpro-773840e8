
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Customers";
import CustomerDetails from "@/pages/CustomerDetails";
import Assets from "@/pages/Assets";
import Bookings from "@/pages/Bookings";
import Maintenance from "@/pages/Maintenance";
import Settings from "@/pages/Settings";
import Financials from "@/pages/Financials";
import Sitemap from "@/pages/Sitemap";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
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
        <Route path="/app/sitemap" element={<Sitemap />} />
      </Route>
    </Routes>
  );
}
