import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import type { MarinaSummary } from "@/types/dashboard";

export default function Dashboard() {
  const { data: marinaData, isLoading } = useMarinaSummary();
  
  // Transform marina data to match MarinaSummary type
  const marinaSummary: MarinaSummary = {
    totalSlips: marinaData?.total_slips || 0,
    occupiedSlips: 0, // You might want to calculate this from your data
    activeRVs: 0, // You might want to calculate this from your data
    occupancyRate: 0, // Calculate: (occupiedSlips / totalSlips) * 100
    monthlyRevenue: 0,
    pendingMaintenance: 0
  };

  return (
    <PageWithChat>
      <PageContainer>
        <DashboardContent 
          marinaSummary={marinaSummary}
          isLoading={isLoading}
        />
      </PageContainer>
    </PageWithChat>
  );
}