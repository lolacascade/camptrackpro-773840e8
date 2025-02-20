
import { PageContainer } from "@/components/layout/PageContainer";
import { StatsGrid } from "./StatsGrid";
import { RevenueBreakdown } from "./RevenueBreakdown";
import { RecentActivity } from "./RecentActivity";
import { FooterStats } from "./FooterStats";
import { BookingsToday } from "./BookingsToday";
import { DashboardProps } from "@/types/dashboard";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PrioritySection } from "./priority/PrioritySection";
import { DashboardCallouts } from "./priority/DashboardCallouts";

export function DashboardContent({ marinaSummary }: DashboardProps) {
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
        <DashboardCallouts />
      </ErrorBoundary>
      
      {/* Commenting out non-core sections
      <ErrorBoundary>
        <PrioritySection />
      </ErrorBoundary>
      */}
      
      <ErrorBoundary>
        <BookingsToday />
      </ErrorBoundary>
      
      {/* Commenting out financial sections
      <ErrorBoundary>
        <RevenueBreakdown />
      </ErrorBoundary>
      */}
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <ErrorBoundary>
          <RecentActivity />
        </ErrorBoundary>
      </div>
      
      <ErrorBoundary>
        <FooterStats totalSlips={marinaSummary?.totalSlots ?? 0} />
      </ErrorBoundary>
    </div>
  );
}
