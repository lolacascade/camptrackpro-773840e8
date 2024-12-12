import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { RevenueBreakdown } from "./RevenueBreakdown";
import { MarinaOverview } from "@/components/marina/MarinaOverview";
import { RecentActivity } from "./RecentActivity";
import { FooterStats } from "./FooterStats";
import { BookingsToday } from "./BookingsToday";
import { DashboardProps } from "@/types/dashboard";

export function DashboardContent({ marinaSummary }: DashboardProps) {
  return (
    <div className="bg-white rounded-[24px] p-4 md:p-12 space-y-8">
      <DashboardHeader />
      <StatsGrid 
        occupancyRate={marinaSummary?.occupancyRate ?? 0}
        occupiedSlips={marinaSummary?.occupiedSlips ?? 0}
        totalSlips={marinaSummary?.totalSlips ?? 0}
        activeBoats={marinaSummary?.activeBoats ?? 0}
      />
      <BookingsToday />
      <RevenueBreakdown />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <MarinaOverview />
        <RecentActivity />
      </div>
      <FooterStats totalSlips={marinaSummary?.totalSlips ?? 0} />
    </div>
  );
}