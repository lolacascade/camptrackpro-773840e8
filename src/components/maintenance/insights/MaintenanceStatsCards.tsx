import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { ClipboardList, Clock, AlertTriangle, Wrench } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface MaintenanceStats {
  totalRequests: {
    open: number;
    inProgress: number;
    completed: number;
  };
  resolutionTime: {
    average: number;
    target: number;
  };
  criticalIssues: {
    critical: number;
    scheduled: number;
  };
  equipmentStatus: {
    underMaintenance: number;
    operational: number;
  };
}

export function MaintenanceStatsCards() {
  const session = useSession();

  const { data: stats } = useQuery({
    queryKey: ['maintenance-stats'],
    queryFn: async (): Promise<MaintenanceStats> => {
      if (!session?.user?.id) throw new Error("No authenticated user");

      // Fetch maintenance requests
      const { data: requests, error } = await supabase
        .from('maintenance_requests')
        .select('status, priority, created_at, completed_at')
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Calculate total requests by status
      const open = requests?.filter(r => r.status === 'pending').length || 0;
      const inProgress = requests?.filter(r => r.status === 'in_progress').length || 0;
      const completed = requests?.filter(r => r.status === 'completed').length || 0;

      // Calculate average resolution time for completed requests
      const completedRequests = requests?.filter(r => r.status === 'completed' && r.completed_at && r.created_at) || [];
      const totalResolutionTime = completedRequests.reduce((acc, req) => {
        const created = new Date(req.created_at);
        const completed = new Date(req.completed_at);
        return acc + (completed.getTime() - created.getTime());
      }, 0);
      const averageResolutionDays = completedRequests.length > 0 
        ? Math.round(totalResolutionTime / (completedRequests.length * 24 * 60 * 60 * 1000))
        : 0;

      // Count critical issues
      const critical = requests?.filter(r => r.priority === 'high').length || 0;
      const scheduled = requests?.filter(r => r.priority === 'medium' || r.priority === 'low').length || 0;

      // Calculate equipment status
      const totalEquipment = await supabase
        .from('assets')
        .select('id, status')
        .eq('user_id', session.user.id);

      const underMaintenance = totalEquipment.data?.filter(e => e.status === 'maintenance').length || 0;
      const total = totalEquipment.data?.length || 0;
      const operationalPercentage = total > 0 ? Math.round(((total - underMaintenance) / total) * 100) : 0;

      return {
        totalRequests: {
          open,
          inProgress,
          completed
        },
        resolutionTime: {
          average: averageResolutionDays,
          target: 3
        },
        criticalIssues: {
          critical,
          scheduled
        },
        equipmentStatus: {
          underMaintenance,
          operational: operationalPercentage
        }
      };
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Maintenance Requests"
        value={`${(stats?.totalRequests.open || 0) + (stats?.totalRequests.inProgress || 0) + (stats?.totalRequests.completed || 0)}`}
        icon={ClipboardList}
        breakdown={[
          { label: "Open", value: stats?.totalRequests.open.toString() || "0", percentage: 30 },
          { label: "In Progress", value: stats?.totalRequests.inProgress.toString() || "0", percentage: 20 },
          { label: "Completed", value: stats?.totalRequests.completed.toString() || "0", percentage: 50 }
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
          { label: "Critical", value: stats?.criticalIssues.critical.toString() || "0", percentage: 30 },
          { label: "Scheduled", value: stats?.criticalIssues.scheduled.toString() || "0", percentage: 70 }
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