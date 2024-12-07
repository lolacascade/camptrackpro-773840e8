import { StatCard } from "./StatCard";
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Occupancy"
        value={`${occupancyRate}%`}
        description={`${occupiedSlips} of ${totalSlips} slips occupied`}
        icon={Anchor}
        trend="up"
        trendValue="Real-time updates enabled"
      />
      <StatCard
        title="Monthly Revenue"
        value="$45,231"
        description="Total revenue this month"
        icon={DollarSign}
        trend="up"
        trendValue="12% from last month"
      />
      <StatCard
        title="Active Boats"
        value={activeBoats.toString()}
        description="Boats currently in marina"
        icon={Ship}
        trend="up"
        trendValue="Real-time updates enabled"
      />
      <StatCard
        title="Pending Maintenance"
        value="8"
        description="Maintenance requests"
        icon={Wrench}
        trend="down"
        trendValue="2 less than last week"
      />
    </div>
  );
}