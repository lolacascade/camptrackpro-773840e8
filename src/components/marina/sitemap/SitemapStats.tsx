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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Slots"
        value={totalSlots.toString()}
        icon={Anchor}
      />
      <StatsCard
        title="Occupied Slots"
        value={occupiedSlots.toString()}
        icon={Ship}
      />
      <StatsCard
        title="Maintenance"
        value={maintenanceSlots.toString()}
        icon={Wrench}
      />
      <StatsCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={TrendingUp}
      />
    </div>
  );
}