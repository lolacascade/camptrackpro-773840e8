import { StatCard } from "@/components/dashboard/StatCard";
import { LucideIcon } from "lucide-react";
import { Sparkline } from "@/components/dashboard/Sparkline";

interface StatCardSparklineProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  sparklineData: { value: number }[];
}

export function StatCardSparkline({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  sparklineData,
}: StatCardSparklineProps) {
  return (
    <StatCard
      title={title}
      value={value}
      description={description}
      icon={Icon}
      trend={trend}
      trendValue={trendValue}
    >
      <Sparkline data={sparklineData} className="mt-4" />
    </StatCard>
  );
}