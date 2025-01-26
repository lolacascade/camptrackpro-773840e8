import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useMarinaSummary } from "@/hooks/use-marina-summary";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import type { MarinaSummary } from "@/types/dashboard";

export default function Dashboard() {
  const { data: marinaData, isLoading } = useMarinaSummary();
  
  // Transform marina data to match MarinaSummary type
  const marinaSummary: MarinaSummary = {
    totalSlips: marinaData?.totalSlots || 0,
    occupiedSlips: marinaData?.occupiedSlots || 0,
    activeRVs: marinaData?.activeRVs || 0,
    occupancyRate: marinaData?.occupancyRate || 0,
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