import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { RevenueBreakdown } from "./RevenueBreakdown";
import { MarinaOverview } from "@/components/marina/MarinaOverview";
import { RecentActivity } from "./RecentActivity";
import { FooterStats } from "./FooterStats";
import { BookingsToday } from "./BookingsToday";
import { DashboardProps } from "@/types/dashboard";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PrioritySection } from "./priority/PrioritySection";
import { DashboardCallouts } from "./priority/DashboardCallouts";

export function DashboardContent({ marinaSummary }: DashboardProps) {
  return (
    <div className="bg-white rounded-[24px] p-4 md:p-12 space-y-8">
      <DashboardHeader />

      <ErrorBoundary>
        <StatsGrid 
          occupancyRate={marinaSummary?.occupancyRate ?? 0}
          occupiedSlips={marinaSummary?.occupiedSlips ?? 0}
          totalSlips={marinaSummary?.totalSlips ?? 0}
          activeBoats={marinaSummary?.activeBoats ?? 0}
        />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <DashboardCallouts />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PrioritySection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BookingsToday />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <RevenueBreakdown />
      </ErrorBoundary>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <ErrorBoundary>
          <MarinaOverview />
        </ErrorBoundary>
        <ErrorBoundary>
          <RecentActivity />
        </ErrorBoundary>
      </div>
      
      <ErrorBoundary>
        <FooterStats totalSlips={marinaSummary?.totalSlips ?? 0} />
      </ErrorBoundary>
    </div>
  );
}