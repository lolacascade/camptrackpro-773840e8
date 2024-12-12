import { EnhancedStatCard } from "./EnhancedStatCard";
import { Anchor, DollarSign, Ship, Wrench } from "lucide-react";

interface StatsGridProps {
  occupancyRate: number;
  occupiedSlips: number;
  totalSlips: number;
  activeBoats: number;
}

export function StatsGrid({ 
  occupancyRate, 
  occupiedSlips, 
  totalSlips, 
  activeBoats 
}: StatsGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Occupancy"
        value={`${occupancyRate}%`}
        icon={Anchor}
        trend={{
          value: "5%",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Occupied Slips", value: occupiedSlips.toString(), percentage: Math.round((occupiedSlips/totalSlips) * 100) },
          { label: "Total Slips", value: totalSlips.toString() }
        ]}
        recommendedActions={[
          { 
            label: "Promote available slips with 10% discount",
            impact: "Potential +15% occupancy increase"
          }
        ]}
      />
      <EnhancedStatCard
        title="Monthly Revenue"
        value="$45,231"
        icon={DollarSign}
        trend={{
          value: "12%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Slip Renewals", value: "$20,000", percentage: 44 },
          { label: "New Rentals", value: "$15,000", percentage: 33 },
          { label: "Maintenance", value: "$10,231", percentage: 23 }
        ]}
      />
      <EnhancedStatCard
        title="Active Boats"
        value={activeBoats.toString()}
        icon={Ship}
        trend={{
          value: "3 boats",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Long-term", value: "12", percentage: 80 },
          { label: "Short-term", value: "3", percentage: 20 }
        ]}
      />
      <EnhancedStatCard
        title="Pending Maintenance"
        value="8"
        icon={Wrench}
        trend={{
          value: "2 tasks",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Urgent", value: "3", percentage: 38 },
          { label: "Scheduled", value: "5", percentage: 62 }
        ]}
        recommendedActions={[
          { 
            label: "Schedule urgent dock repairs",
            impact: "Prevents potential revenue loss"
          }
        ]}
      />
    </div>
  );
}