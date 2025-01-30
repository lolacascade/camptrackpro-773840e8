import { LogOut } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface CheckOutsCardProps {
  value: number;
}

export function CheckOutsCard({ value }: CheckOutsCardProps) {
  return (
    <EnhancedStatCard
      title="Check-outs"
      value={String(value)}
      icon={LogOut}
      trend={{
        value: "Within range",
        isPositive: true,
        comparedTo: "selected period"
      }}
      breakdown={[
        { label: "Morning", value: String(Math.ceil(value * 0.7)), percentage: 70 },
        { label: "Afternoon", value: String(Math.floor(value * 0.3)), percentage: 30 }
      ]}
    />
  );
}