import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { DollarSign, TrendingUp, Ship, Anchor } from "lucide-react";

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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Slots"
        value={totalSlots.toString()}
        icon={Anchor}
        breakdown={[
          { label: "Available", value: (totalSlots - occupiedSlots - maintenanceSlots).toString() },
          { label: "In Use", value: occupiedSlots.toString() }
        ]}
      />
      <EnhancedStatCard
        title="Occupied Slots"
        value={occupiedSlots.toString()}
        icon={Ship}
        trend={{
          value: `${occupancyRate}%`,
          isPositive: occupancyRate > 50,
          comparedTo: "capacity"
        }}
      />
      <EnhancedStatCard
        title="Maintenance"
        value={maintenanceSlots.toString()}
        icon={TrendingUp}
        breakdown={[
          { label: "Active", value: maintenanceSlots.toString() },
          { label: "Total Slots", value: totalSlots.toString() }
        ]}
      />
      <EnhancedStatCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        icon={DollarSign}
        trend={{
          value: `${occupancyRate}%`,
          isPositive: occupancyRate > 50,
          comparedTo: "total capacity"
        }}
      />
    </div>
  );
}