import { StatCard } from "@/components/dashboard/StatCard";
import { Anchor, Wrench, Ship } from "lucide-react";

interface SlipStatsProps {
  totalSlips: number;
  availableSlips: number;
  occupiedSlips: number;
  maintenanceSlips: number;
}

export function SlipStats({
  totalSlips,
  availableSlips,
  occupiedSlips,
  maintenanceSlips,
}: SlipStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
      <StatCard
        title="Total Slips"
        value={totalSlips.toString()}
        description="Total number of slips"
        icon={Anchor}
      />
      <StatCard
        title="Available Slips"
        value={availableSlips.toString()}
        description="Ready for assignment"
        icon={Anchor}
      />
      <StatCard
        title="Occupied Slips"
        value={occupiedSlips.toString()}
        description="Currently in use"
        icon={Ship}
      />
      <StatCard
        title="Under Maintenance"
        value={maintenanceSlips.toString()}
        description="Being serviced"
        icon={Wrench}
      />
    </div>
  );
}