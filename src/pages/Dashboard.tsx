import { Layout } from "@/components/layout/Layout";
import { MarinaOverview } from "@/components/dashboard/MarinaOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { FooterStats } from "@/components/dashboard/FooterStats";
import { RevenueBreakdown } from "@/components/dashboard/RevenueBreakdown";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChatAssistant } from "@/components/dashboard/ChatAssistant";
import { Routes, Route, Navigate } from "react-router-dom";
import MarinaMap from "./MarinaMap";
import Customers from "./Customers";
import Boats from "./Boats";
import Maintenance from "./Maintenance";
import Settings from "./Settings";

export default function Dashboard() {
  const { data: marinaSummary } = useQuery({
    queryKey: ['marinaSummary'],
    queryFn: async () => {
      const { data: slipsData, error: slipsError } = await supabase
        .from('slips')
        .select('status');

      if (slipsError) throw slipsError;

      const { data: boatsData, error: boatsError } = await supabase
        .from('boats')
        .select('id');

      if (boatsError) throw boatsError;

      const totalSlips = slipsData.length;
      const occupiedSlips = slipsData.filter(slip => slip.status === 'occupied').length;
      const activeBoats = boatsData.length;
      const occupancyRate = totalSlips > 0 
        ? Math.round((occupiedSlips / totalSlips) * 100)
        : 0;

      return {
        totalSlips,
        occupiedSlips,
        activeBoats,
        occupancyRate
      };
    }
  });

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <ChatAssistant />
        <div className="flex-1 p-12">
          <Routes>
            <Route path="/" element={
              <div className="bg-white rounded-[24px] p-12 space-y-8">
                <DashboardHeader />
                <StatsGrid 
                  occupancyRate={marinaSummary?.occupancyRate ?? 0}
                  occupiedSlips={marinaSummary?.occupiedSlips ?? 0}
                  totalSlips={marinaSummary?.totalSlips ?? 0}
                  activeBoats={marinaSummary?.activeBoats ?? 0}
                />
                <RevenueBreakdown />
                <div className="grid gap-8 md:grid-cols-2">
                  <MarinaOverview />
                  <RecentActivity />
                </div>
                <FooterStats totalSlips={marinaSummary?.totalSlips ?? 0} />
              </div>
            } />
            <Route path="/map" element={<MarinaMap />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/boats" element={<Boats />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
}