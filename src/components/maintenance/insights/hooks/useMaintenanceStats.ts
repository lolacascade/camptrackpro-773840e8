import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { MaintenanceStats } from "../types/maintenance-stats";

export function useMaintenanceStats() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["maintenance-stats", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return null;

      const { data: maintenanceRequests, error: maintenanceError } = await supabase
        .from("maintenance_requests")
        .select(`
          *,
          site:sites(*)
        `)
        .eq("organization_id", organizationId)
        .eq("account_id", accountId);

      if (maintenanceError) throw maintenanceError;

      const { data: sites } = await supabase
        .from("sites")
        .select("*")
        .eq("organization_id", organizationId)
        .eq("account_id", accountId);

      // Calculate stats
      const stats: MaintenanceStats = {
        totalRequests: {
          open: maintenanceRequests.filter(r => r.status === 'pending').length,
          inProgress: maintenanceRequests.filter(r => r.status === 'in_progress').length,
          completed: maintenanceRequests.filter(r => r.status === 'completed').length
        },
        resolutionTime: {
          average: calculateAverageResolutionTime(maintenanceRequests),
          target: 3 // Default target time in days
        },
        criticalIssues: {
          critical: maintenanceRequests.filter(r => r.priority === 'high').length,
          scheduled: maintenanceRequests.filter(r => r.priority === 'medium' || r.priority === 'low').length
        },
        equipmentStatus: {
          operational: calculateOperationalPercentage(sites || []),
          underMaintenance: maintenanceRequests.filter(r => r.status === 'in_progress').length
        }
      };

      return stats;
    },
    enabled: !!organizationId && !!accountId,
  });
}

function calculateAverageResolutionTime(requests: any[]): number {
  const completedRequests = requests.filter(r => r.status === 'completed' && r.completed_at);
  if (completedRequests.length === 0) return 0;

  const totalTime = completedRequests.reduce((sum, r) => {
    const completedAt = new Date(r.completed_at);
    const createdAt = new Date(r.created_at);
    return sum + (completedAt.getTime() - createdAt.getTime());
  }, 0);

  return Math.round(totalTime / (completedRequests.length * 24 * 60 * 60 * 1000)); // Convert to days
}

function calculateOperationalPercentage(sites: any[]): number {
  if (sites.length === 0) return 0;
  const operational = sites.filter(s => s.status === 'available').length;
  return Math.round((operational / sites.length) * 100);
}