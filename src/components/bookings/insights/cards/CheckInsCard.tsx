import { Calendar } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface CheckInsCardProps {
  value: number;
}

export function CheckInsCard({ value }: CheckInsCardProps) {
  return (
    <EnhancedStatCard
      title="Check-ins"
      value={String(value)}
      icon={Calendar}
      trend={{
        value: "Within range",
        isPositive: true,
        comparedTo: "selected period"
      }}
      breakdown={[
        { label: "Morning", value: String(Math.ceil(value * 0.6)), percentage: 60 },
        { label: "Afternoon", value: String(Math.floor(value * 0.4)), percentage: 40 }
      ]}
    />
  );
}