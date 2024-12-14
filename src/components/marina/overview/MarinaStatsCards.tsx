import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Anchor, Ship, ArrowRightLeft, Activity } from "lucide-react";
import { MarinaStats } from "@/types/marina";

interface MarinaStatsCardsProps {
  stats: MarinaStats;
}

export function MarinaStatsCards({ stats }: MarinaStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Docks"
        value={`${stats?.totalSlots || 0}`}
        icon={Anchor}
        trend={{
          value: "2 new",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { 
            label: "Available", 
            value: String(stats?.availableSlots || 0), 
            percentage: Math.round(((stats?.availableSlots || 0) / (stats?.totalSlots || 1)) * 100) 
          },
          { 
            label: "Maintenance", 
            value: String(stats?.maintenanceSlots || 0),
            percentage: Math.round(((stats?.maintenanceSlots || 0) / (stats?.totalSlots || 1)) * 100)
          }
        ]}
      />
      <EnhancedStatCard
        title="Current Occupancy"
        value={`${stats?.occupancyRate || 0}%`}
        icon={Ship}
        trend={{
          value: "2%",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Occupied Slips", value: String(stats?.occupiedSlots || 0), percentage: stats?.occupancyRate || 0 },
          { label: "Available Slips", value: String(stats?.availableSlots || 0), percentage: 100 - (stats?.occupancyRate || 0) }
        ]}
      />
      <EnhancedStatCard
        title="Upcoming Activity"
        value={String(stats?.upcomingArrivals || 0)}
        icon={ArrowRightLeft}
        trend={{
          value: "3 more",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Arrivals", value: String(stats?.upcomingArrivals || 0), percentage: 60 },
          { label: "Departures", value: "8", percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Dock Utilization"
        value="65%"
        icon={Activity}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Long-term", value: "70%", percentage: 70 },
          { label: "Short-term", value: "50%", percentage: 50 }
        ]}
      />
    </div>
  );
}