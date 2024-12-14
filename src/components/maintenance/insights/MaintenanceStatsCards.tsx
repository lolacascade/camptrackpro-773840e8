import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { ClipboardList, Clock, AlertTriangle, Wrench } from "lucide-react";
import { useMaintenanceStats } from "./hooks/useMaintenanceStats";

export function MaintenanceStatsCards() {
  const { data: stats } = useMaintenanceStats();

  const totalRequests = (stats?.totalRequests.open || 0) + 
    (stats?.totalRequests.inProgress || 0) + 
    (stats?.totalRequests.completed || 0);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Maintenance Requests"
        value={totalRequests.toString()}
        icon={ClipboardList}
        breakdown={[
          { label: "Open", value: stats?.totalRequests.open.toString() || "0", percentage: Math.round((stats?.totalRequests.open || 0) / totalRequests * 100) || 0 },
          { label: "In Progress", value: stats?.totalRequests.inProgress.toString() || "0", percentage: Math.round((stats?.totalRequests.inProgress || 0) / totalRequests * 100) || 0 },
          { label: "Completed", value: stats?.totalRequests.completed.toString() || "0", percentage: Math.round((stats?.totalRequests.completed || 0) / totalRequests * 100) || 0 }
        ]}
      />
      <EnhancedStatCard
        title="Average Resolution Time"
        value={`${stats?.resolutionTime.average || 0} days`}
        icon={Clock}
        trend={{
          value: `Target: ${stats?.resolutionTime.target} days`,
          isPositive: (stats?.resolutionTime.average || 0) <= (stats?.resolutionTime.target || 3),
          comparedTo: "target time"
        }}
        breakdown={[
          { label: "Current Average", value: `${stats?.resolutionTime.average || 0} days`, percentage: 100 },
          { label: "Target Time", value: `${stats?.resolutionTime.target || 3} days` }
        ]}
      />
      <EnhancedStatCard
        title="Critical Issues"
        value={`${stats?.criticalIssues.critical || 0}`}
        icon={AlertTriangle}
        trend={{
          value: "2 new",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Critical", value: stats?.criticalIssues.critical.toString() || "0", percentage: Math.round((stats?.criticalIssues.critical || 0) / ((stats?.criticalIssues.critical || 0) + (stats?.criticalIssues.scheduled || 0)) * 100) || 0 },
          { label: "Scheduled", value: stats?.criticalIssues.scheduled.toString() || "0", percentage: Math.round((stats?.criticalIssues.scheduled || 0) / ((stats?.criticalIssues.critical || 0) + (stats?.criticalIssues.scheduled || 0)) * 100) || 0 }
        ]}
      />
      <EnhancedStatCard
        title="Equipment Status"
        value={`${stats?.equipmentStatus.operational || 0}%`}
        icon={Wrench}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Operational", value: `${stats?.equipmentStatus.operational}%`, percentage: stats?.equipmentStatus.operational || 0 },
          { label: "Under Maintenance", value: stats?.equipmentStatus.underMaintenance.toString(), percentage: 100 - (stats?.equipmentStatus.operational || 0) }
        ]}
      />
    </div>
  );
}