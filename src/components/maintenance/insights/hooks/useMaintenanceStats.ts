import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { Maintenance } from "@/types/maintenance";

export function useMaintenanceStats() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["maintenance-stats", organizationId, accountId],
    queryFn: async () => {
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

      const processedStats = maintenanceRequests.map(request => {
        const site = sites.find(site => site.id === request.site_id);
        return {
          ...request,
          site_name: site ? site.name : "Unknown"
        };
      });

      return processedStats as Maintenance[];
    },
    enabled: !!organizationId && !!accountId,
  });
}
