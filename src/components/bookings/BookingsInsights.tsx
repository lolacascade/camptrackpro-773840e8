import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { ChartBar, Activity, Calendar, LogOut } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useBookingsInsights } from "./hooks/useBookingsInsights";

interface BookingsInsightsProps {
  dateRange?: DateRange;
}

export function BookingsInsights({ dateRange }: BookingsInsightsProps) {
  const { data: insights, isLoading } = useBookingsInsights(dateRange);
  
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-[160px] bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <EnhancedStatCard
        title="Active Bookings"
        value={String(insights?.activeBookings || 0)}
        icon={ChartBar}
        trend={{
          value: "+12%",
          isPositive: true,
          comparedTo: "previous period"
        }}
        breakdown={[
          { label: "Short-term", value: "45", percentage: 60 },
          { label: "Long-term", value: "30", percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="RV Types"
        value={String(insights?.rvTypeDistribution?.length || 0)}
        icon={Activity}
        breakdown={insights?.rvTypeDistribution || [
          { label: "Loading...", value: "0", percentage: 0 },
          { label: "Loading...", value: "0", percentage: 0 }
        ]}
      />
      <EnhancedStatCard
        title="Today's Check-ins"
        value={String(insights?.checkIns || 0)}
        icon={Calendar}
        trend={{
          value: "On schedule",
          isPositive: true,
          comparedTo: "today"
        }}
        breakdown={[
          { label: "Morning", value: String(Math.ceil((insights?.checkIns || 0) * 0.6)), percentage: 60 },
          { label: "Afternoon", value: String(Math.floor((insights?.checkIns || 0) * 0.4)), percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Today's Check-outs"
        value={String(insights?.checkOuts || 0)}
        icon={LogOut}
        trend={{
          value: "On schedule",
          isPositive: true,
          comparedTo: "today"
        }}
        breakdown={[
          { label: "Morning", value: String(Math.ceil((insights?.checkOuts || 0) * 0.7)), percentage: 70 },
          { label: "Afternoon", value: String(Math.floor((insights?.checkOuts || 0) * 0.3)), percentage: 30 }
        ]}
      />
    </div>
  );
}