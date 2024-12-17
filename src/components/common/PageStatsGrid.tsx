import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Anchor, DollarSign, Ship, Wrench } from "lucide-react";

interface PageStatsGridProps {
  title: string;
  stats: {
    occupancyRate: number;
    occupiedSlips: number;
    totalSlips: number;
    activeRVs: number;
    monthlyRevenue: number;
    pendingMaintenance: number;
  };
}

export function PageStatsGrid({ title, stats }: PageStatsGridProps) {
  return (
    <div className="space-y-4 mb-8">
      <h1 className="text-3xl font-semibold text-[#133134]">{title}</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Total Occupancy"
          value={`${stats.occupancyRate}%`}
          icon={Anchor}
          trend={{
            value: "5%",
            isPositive: false,
            comparedTo: "last week"
          }}
          breakdown={[
            { label: "Occupied Sites", value: stats.occupiedSlips.toString(), percentage: Math.round((stats.occupiedSlips/stats.totalSlips) * 100) },
            { label: "Total Sites", value: stats.totalSlips.toString() }
          ]}
        />
        <EnhancedStatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{
            value: "12%",
            isPositive: true,
            comparedTo: "last month"
          }}
          breakdown={[
            { label: "Site Renewals", value: "$20,000", percentage: 44 },
            { label: "New Rentals", value: "$15,000", percentage: 33 },
            { label: "Maintenance", value: "$10,231", percentage: 23 }
          ]}
        />
        <EnhancedStatCard
          title="Active RVs"
          value={stats.activeRVs.toString()}
          icon={Ship}
          trend={{
            value: "3 RVs",
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
          value={stats.pendingMaintenance.toString()}
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
        />
      </div>
    </div>
  );
}