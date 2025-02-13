
import { DateRange } from "react-day-picker";
import { useBookingsInsights } from "./hooks/useBookingsInsights";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { CalendarDays, Clock, LogIn, LogOut } from "lucide-react";

interface BookingsInsightsProps {
  dateRange?: DateRange;
}

export function BookingsInsights({ dateRange }: BookingsInsightsProps) {
  const { data: insights, isLoading, error } = useBookingsInsights(dateRange);
  
  if (error) {
    console.error('Error loading insights:', error);
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-[160px] bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Active Bookings"
        value={insights?.activeBookings || 0}
        icon={CalendarDays}
        trend={{
          value: `${Math.abs(insights?.quarterlyGrowth || 0).toFixed(1)}%`,
          isPositive: (insights?.quarterlyGrowth || 0) >= 0,
          comparedTo: "this quarter"
        }}
        breakdown={[
          { 
            label: "YoY Change", 
            value: `${Math.abs(insights?.yoyComparison || 0).toFixed(1)}%`,
            percentage: insights?.yoyComparison || 0
          }
        ]}
      />
      <EnhancedStatCard
        title="Average Tenancy Duration"
        value={`${Math.round(insights?.avgTenancyDays || 0)} days`}
        icon={Clock}
        breakdown={[
          { label: "Shortest Stay", value: `${insights?.minTenancyDays || 0} days` },
          { label: "Longest Stay", value: `${insights?.maxTenancyDays || 0} days` }
        ]}
      />
      <EnhancedStatCard
        title="Check-ins Today"
        value={insights?.todayCheckIns || 0}
        icon={LogIn}
        breakdown={[
          { label: "This Month", value: String(insights?.monthlyCheckIns || 0) },
          { label: "This Period", value: String(insights?.periodCheckIns || 0) }
        ]}
      />
      <EnhancedStatCard
        title="Check-outs Today"
        value={insights?.todayCheckOuts || 0}
        icon={LogOut}
        breakdown={[
          { label: "This Month", value: String(insights?.monthlyCheckOuts || 0) },
          { label: "This Period", value: String(insights?.periodCheckOuts || 0) }
        ]}
      />
    </div>
  );
}
