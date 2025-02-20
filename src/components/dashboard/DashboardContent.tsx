
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { StatsGrid } from "./StatsGrid";
import { BookingsToday } from "./BookingsToday";
import { DashboardProps } from "@/types/dashboard";

export function DashboardContent({ marinaSummary, isLoading }: DashboardProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-[#133134]">RV Park Dashboard</h1>

      <ErrorBoundary>
        <StatsGrid 
          occupancyRate={marinaSummary?.occupancyRate ?? 0}
          occupiedSlips={marinaSummary?.occupiedSlots ?? 0}
          totalSlips={marinaSummary?.totalSlots ?? 0}
          activeRVs={marinaSummary?.activeRVs ?? 0}
          monthlyRevenue={marinaSummary?.monthlyRevenue}
          pendingMaintenance={marinaSummary?.pendingMaintenance}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <BookingsToday />
      </ErrorBoundary>
    </div>
  );
}
