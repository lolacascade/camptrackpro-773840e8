
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Assets from "@/features/assets/pages/Assets";
import Customers from "@/pages/Customers";
import Bookings from "@/pages/Bookings";
import Sitemap from "@/pages/Sitemap";
import { AuthGuard } from "@/components/auth/AuthGuard";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthGuard><Layout /></AuthGuard>}>
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="assets" element={<Assets />} />
        <Route path="sitemap" element={<Sitemap />} />
      </Route>
    </Routes>
  );
}
