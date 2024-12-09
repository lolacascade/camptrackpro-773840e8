import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { RevenueBreakdown } from "./RevenueBreakdown";
import { MarinaOverview } from "./MarinaOverview";
import { RecentActivity } from "./RecentActivity";
import { FooterStats } from "./FooterStats";
import { DashboardProps } from "@/types/dashboard";

export function DashboardContent({ marinaSummary }: DashboardProps) {
  return (
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
  );
}