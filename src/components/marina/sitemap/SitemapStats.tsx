import { StatsCard } from "@/components/common/StatsCard";
import { Anchor, Boat, Tool, TrendingUp } from "lucide-react";

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
        icon={<Anchor className="h-4 w-4" />}
        trend={{
          value: totalSlots > 0 ? "+1" : "0",
          label: "from last month"
        }}
      />
      <StatsCard
        title="Occupied Slots"
        value={occupiedSlots}
        icon={<Boat className="h-4 w-4" />}
        trend={{
          value: occupiedSlots > 0 ? "+2" : "0",
          label: "from last month"
        }}
      />
      <StatsCard
        title="Maintenance"
        value={maintenanceSlots}
        icon={<Tool className="h-4 w-4" />}
        trend={{
          value: maintenanceSlots > 0 ? "-1" : "0",
          label: "from last month"
        }}
      />
      <StatsCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={<TrendingUp className="h-4 w-4" />}
        trend={{
          value: occupancyRate > 0 ? "+5%" : "0%",
          label: "from last month"
        }}
      />
    </div>
  );
}