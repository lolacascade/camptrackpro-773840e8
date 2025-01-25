import { StatsCard } from "@/components/common/StatsCard";
import { Anchor, Ship, Wrench, TrendingUp } from "lucide-react";

interface SitemapStatsProps {
  totalSlots: number;
  occupiedSlots: number;
  maintenanceSlots: number;
  occupancyRate: number;
}

export function SitemapStats({
  totalSlots,
  occupiedSlots,
  maintenanceSlots,
  occupancyRate,
}: SitemapStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Slots"
        value={totalSlots}
        icon={Anchor}
        trend={{
          value: "+1",
          isPositive: true,
          comparedTo: "from last month"
        }}
      />
      <StatsCard
        title="Occupied Slots"
        value={occupiedSlots}
        icon={Ship}
        trend={{
          value: "+2",
          isPositive: true,
          comparedTo: "from last month"
        }}
      />
      <StatsCard
        title="Maintenance"
        value={maintenanceSlots}
        icon={Wrench}
        trend={{
          value: "-1",
          isPositive: false,
          comparedTo: "from last month"
        }}
      />
      <StatsCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={TrendingUp}
        trend={{
          value: "+5%",
          isPositive: true,
          comparedTo: "from last month"
        }}
      />
    </div>
  );
}