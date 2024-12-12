import { DashboardHeader } from "./DashboardHeader";
import { RealTimeAlerts } from "./alerts/RealTimeAlerts";
import { CustomerInsights } from "./insights/CustomerInsights";
import { RevenueSummary } from "./revenue/RevenueSummary";
import { UtilizationInsights } from "./insights/UtilizationInsights";
import { MarinaOverview } from "@/components/marina/MarinaOverview";
import { RecentActivity } from "./RecentActivity";
import { FooterStats } from "./FooterStats";
import { BookingsToday } from "./BookingsToday";
import { DashboardProps } from "@/types/dashboard";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export function DashboardContent({ marinaSummary }: DashboardProps) {
  return (
    <div className="bg-white rounded-[24px] p-4 md:p-12 space-y-8">
      <DashboardHeader />
      
      <ErrorBoundary>
        <RealTimeAlerts />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CustomerInsights />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <RevenueSummary />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <UtilizationInsights />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BookingsToday />
      </ErrorBoundary>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <ErrorBoundary>
          <RecentActivity />
        </ErrorBoundary>
      </div>
      
      <ErrorBoundary>
        <MarinaOverview />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FooterStats totalSlips={marinaSummary?.totalSlips ?? 0} />
      </ErrorBoundary>
    </div>
  );
}