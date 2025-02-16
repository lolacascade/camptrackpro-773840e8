
import { Button } from "@/components/ui/button";
import { MaintenanceStatsCards } from "./insights/MaintenanceStatsCards";

interface MaintenanceHeaderProps {
  onAddRequest: () => void;
}

export function MaintenanceHeader({ onAddRequest }: MaintenanceHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-[#133134]">Maintenance Requests</h1>
        <Button onClick={onAddRequest}>Add Request</Button>
      </div>
      <MaintenanceStatsCards />
    </div>
  );
}
