import { DateRange } from "react-day-picker";
import { useBookingsInsights } from "./hooks/useBookingsInsights";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { CalendarDays, CaravanIcon, LogIn, LogOut } from "lucide-react";

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
        value={insights?.activeBookings || 0}
        icon={CalendarDays}
        breakdown={[
          { label: "Current", value: String(insights?.activeBookings || 0) }
        ]}
      />
      <EnhancedStatCard
        title="RV Types"
        value={insights?.rvTypeDistribution?.[0]?.value || "0"}
        icon={CaravanIcon}
        breakdown={insights?.rvTypeDistribution?.map(type => ({
          label: type.label,
          value: type.value,
          percentage: type.percentage
        })) || []}
      />
      <EnhancedStatCard
        title="Check-ins"
        value={insights?.checkIns || 0}
        icon={LogIn}
        breakdown={[
          { label: "Today", value: String(insights?.checkIns || 0) }
        ]}
      />
      <EnhancedStatCard
        title="Check-outs"
        value={insights?.checkOuts || 0}
        icon={LogOut}
        breakdown={[
          { label: "Today", value: String(insights?.checkOuts || 0) }
        ]}
      />
    </div>
  );
}