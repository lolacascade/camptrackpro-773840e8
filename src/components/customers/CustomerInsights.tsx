import { StatCard } from "@/components/dashboard/StatCard";
import { ChartBar, Clock, MapPin, StickyNote } from "lucide-react";
import { useAverageValue } from "@/hooks/customers/useAverageValue";
import { useAverageStayDuration } from "@/hooks/customers/useAverageStayDuration";
import { usePreferredSpot } from "@/hooks/customers/usePreferredSpot";
import { useLatestNote } from "@/hooks/customers/useLatestNote";

export function CustomerInsights() {
  const { data: averageValue } = useAverageValue();
  const { data: avgStayDuration } = useAverageStayDuration();
  const { data: preferredSpot } = usePreferredSpot();
  const { data: latestNote } = useLatestNote();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Average Revenue Per Stay"
        value={averageValue || '$0.00'}
        description="Average revenue per booking"
        icon={ChartBar}
        trend="up"
        trendValue="Based on paid invoices"
      />
      <StatCard
        title="Average Stay Duration"
        value={avgStayDuration || '0 days'}
        description="Average length of stay per visit"
        icon={Clock}
        trend="up"
        trendValue="Calculated from bookings"
      />
      <StatCard
        title="Preferred Location"
        value={preferredSpot || 'No preference'}
        description="Most commonly used spot"
        icon={MapPin}
        trend="up"
        trendValue="Based on booking history"
      />
      <StatCard
        title="Latest Note"
        value={latestNote || 'No notes'}
        description="Most recent customer note"
        icon={StickyNote}
        trend="up"
        trendValue="From customer notes"
      />
    </div>
  );
}