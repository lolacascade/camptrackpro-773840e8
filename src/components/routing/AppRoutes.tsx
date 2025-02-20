
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import RVs from "@/features/rvs/pages/RVs";
import Customers from "@/pages/Customers";
import Bookings from "@/pages/Bookings";
import Sitemap from "@/pages/Sitemap";
import { AuthGuard } from "@/components/auth/AuthGuard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Index from "@/pages/Index";
import ResetPassword from "@/pages/ResetPassword";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route path="/app" element={<AuthGuard><Layout /></AuthGuard>}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="rvs" element={<RVs />} />
        <Route path="sitemap" element={<Sitemap />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
