import { Anchor, Ship, Wrench, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/common/StatsCard";

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
  occupancyRate
}: SitemapStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Sites"
        value={totalSlots.toString()}
        icon={Anchor}
        breakdown={[
          { label: "Occupied", value: occupiedSlots.toString(), percentage: Math.round((occupiedSlots/totalSlots) * 100) },
          { label: "Available", value: (totalSlots - occupiedSlots - maintenanceSlots).toString(), percentage: Math.round(((totalSlots - occupiedSlots - maintenanceSlots)/totalSlots) * 100) }
        ]}
      />
      
      <StatsCard
        title="Site Utilization"
        value={`${occupancyRate}%`}
        icon={Ship}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Peak Hours", value: "95%", percentage: 95 },
          { label: "Off Hours", value: "75%", percentage: 75 }
        ]}
      />

      <StatsCard
        title="Most Active Site"
        value="Dock A-12"
        icon={DollarSign}
        breakdown={[
          { label: "Monthly Bookings", value: "15", percentage: 100 },
          { label: "Average Stay", value: "5 days" }
        ]}
      />

      <StatsCard
        title="Maintenance"
        value={maintenanceSlots.toString()}
        icon={Wrench}
        trend={{
          value: "2 sites",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Urgent", value: "3", percentage: 60 },
          { label: "Scheduled", value: "2", percentage: 40 }
        ]}
        recommendedActions={[
          { 
            label: "Schedule urgent site repairs",
            impact: "Prevents potential revenue loss"
          }
        ]}
      />
    </div>
  );
}