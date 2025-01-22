import { Activity } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface LifetimeValueStatCardProps {
  value: number;
}

export function LifetimeValueStatCard({ value }: LifetimeValueStatCardProps) {
  return (
    <EnhancedStatCard
      title="Lifetime Value"
      value={`$${value}`}
      icon={Activity}
      trend={{
        value: "3%",
        isPositive: true,
        comparedTo: "last month"
      }}
      breakdown={[
        { label: "Services", value: "60%", percentage: 60 },
        { label: "Products", value: "40%", percentage: 40 }
      ]}
    />
  );
}