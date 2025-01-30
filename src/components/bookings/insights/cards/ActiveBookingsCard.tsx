import { ChartBar } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface ActiveBookingsCardProps {
  value: number;
}

export function ActiveBookingsCard({ value }: ActiveBookingsCardProps) {
  return (
    <EnhancedStatCard
      title="Active Bookings"
      value={String(value)}
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
  );
}