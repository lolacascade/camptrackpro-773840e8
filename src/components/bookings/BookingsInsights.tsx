import { DateRange } from "react-day-picker";
import { useBookingsInsights } from "./hooks/useBookingsInsights";
import { ActiveBookingsCard } from "./insights/cards/ActiveBookingsCard";
import { RVTypesCard } from "./insights/cards/RVTypesCard";
import { CheckInsCard } from "./insights/cards/CheckInsCard";
import { CheckOutsCard } from "./insights/cards/CheckOutsCard";

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
      <ActiveBookingsCard value={insights?.activeBookings || 0} />
      <RVTypesCard 
        rvTypes={insights?.rvTypeDistribution || [
          { label: "No data", value: "0", percentage: 0 },
          { label: "No data", value: "0", percentage: 0 }
        ]} 
      />
      <CheckInsCard value={insights?.checkIns || 0} />
      <CheckOutsCard value={insights?.checkOuts || 0} />
    </div>
  );
}