import { LogOut } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface CheckOutsCardProps {
  value: number;
}

export function CheckOutsCard({ value }: CheckOutsCardProps) {
  return (
    <EnhancedStatCard
      title="Today's Check-outs"
      value={String(value)}
      icon={LogOut}
      trend={{
        value: "On schedule",
        isPositive: true,
        comparedTo: "today"
      }}
      breakdown={[
        { label: "Morning", value: String(Math.ceil(value * 0.7)), percentage: 70 },
        { label: "Afternoon", value: String(Math.floor(value * 0.3)), percentage: 30 }
      ]}
    />
  );
}