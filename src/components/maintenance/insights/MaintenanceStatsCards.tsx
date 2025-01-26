import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { ClipboardList, Clock, AlertTriangle, Wrench } from "lucide-react";
import { useMaintenanceStats } from "./hooks/useMaintenanceStats";

export function MaintenanceStatsCards() {
  const { data: stats } = useMaintenanceStats();

  if (!stats) {
    return null;
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Maintenance Requests"
        value={String(stats.totalRequests.open + stats.totalRequests.inProgress + stats.totalRequests.completed)}
        icon={ClipboardList}
        breakdown={[
          { label: "Open", value: String(stats.totalRequests.open), percentage: Math.round((stats.totalRequests.open / (stats.totalRequests.open + stats.totalRequests.inProgress + stats.totalRequests.completed)) * 100) || 0 },
          { label: "In Progress", value: String(stats.totalRequests.inProgress), percentage: Math.round((stats.totalRequests.inProgress / (stats.totalRequests.open + stats.totalRequests.inProgress + stats.totalRequests.completed)) * 100) || 0 },
          { label: "Completed", value: String(stats.totalRequests.completed), percentage: Math.round((stats.totalRequests.completed / (stats.totalRequests.open + stats.totalRequests.inProgress + stats.totalRequests.completed)) * 100) || 0 }
        ]}
      />

      <EnhancedStatCard
        title="Average Resolution Time"
        value={`${stats.resolutionTime.average} days`}
        icon={Clock}
        trend={{
          value: `Target: ${stats.resolutionTime.target} days`,
          isPositive: stats.resolutionTime.average <= stats.resolutionTime.target,
          comparedTo: "target time"
        }}
        breakdown={[
          { label: "Current Average", value: `${stats.resolutionTime.average} days`, percentage: 100 },
          { label: "Target Time", value: `${stats.resolutionTime.target} days` }
        ]}
      />

      <EnhancedStatCard
        title="Critical Issues"
        value={String(stats.criticalIssues.critical)}
        icon={AlertTriangle}
        trend={{
          value: "2 new",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Critical", value: String(stats.criticalIssues.critical), percentage: Math.round((stats.criticalIssues.critical / (stats.criticalIssues.critical + stats.criticalIssues.scheduled)) * 100) || 0 },
          { label: "Scheduled", value: String(stats.criticalIssues.scheduled), percentage: Math.round((stats.criticalIssues.scheduled / (stats.criticalIssues.critical + stats.criticalIssues.scheduled)) * 100) || 0 }
        ]}
      />

      <EnhancedStatCard
        title="Equipment Status"
        value={`${stats.equipmentStatus.operational}%`}
        icon={Wrench}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Operational", value: `${stats.equipmentStatus.operational}%`, percentage: stats.equipmentStatus.operational },
          { label: "Under Maintenance", value: String(stats.equipmentStatus.underMaintenance), percentage: 100 - stats.equipmentStatus.operational }
        ]}
      />
    </div>
  );
}