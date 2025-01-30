import { Calendar } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface CheckInsCardProps {
  value: number;
}

export function CheckInsCard({ value }: CheckInsCardProps) {
  return (
    <EnhancedStatCard
      title="Today's Check-ins"
      value={String(value)}
      icon={Calendar}
      trend={{
        value: "On schedule",
        isPositive: true,
        comparedTo: "today"
      }}
      breakdown={[
        { label: "Morning", value: String(Math.ceil(value * 0.6)), percentage: 60 },
        { label: "Afternoon", value: String(Math.floor(value * 0.4)), percentage: 40 }
      ]}
    />
  );
}