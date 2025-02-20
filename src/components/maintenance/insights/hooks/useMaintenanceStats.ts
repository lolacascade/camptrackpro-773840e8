
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

      // Commenting out maintenance queries until table is created
      // const { data: maintenanceRequests, error: maintenanceError } = await supabase
      //   .from("maintenance_requests")
      //   .select(`
      //     *,
      //     site:sites(*)
      //   `)
      //   .eq("organization_id", organizationId)
      //   .eq("account_id", accountId);

      // if (maintenanceError) throw maintenanceError;

      // const { data: sites } = await supabase
      //   .from("sites")
      //   .select("*")
      //   .eq("organization_id", organizationId)
      //   .eq("account_id", accountId);

      // Return default stats
      const stats: MaintenanceStats = {
        totalRequests: {
          open: 0,
          inProgress: 0,
          completed: 0
        },
        resolutionTime: {
          average: 0,
          target: 3
        },
        criticalIssues: {
          critical: 0,
          scheduled: 0
        },
        equipmentStatus: {
          operational: 0,
          underMaintenance: 0
        }
      };

      return stats;
    },
    enabled: !!organizationId && !!accountId,
  });
}
