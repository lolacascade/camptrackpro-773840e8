import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaSummary } from "@/types/dashboard";
import { useOrganization } from "./use-organization";

export function useMarinaSummary() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ['marina-summary', organizationId, accountId],
    queryFn: async (): Promise<MarinaSummary> => {
      if (!organizationId || !accountId) {
        throw new Error('Organization or account context not available');
      }

      const { data: sites, error } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching marina summary:', error);
        throw error;
      }

      const totalSlots = sites?.length || 0;
      const occupiedSlots = sites?.filter(slot => slot.status === 'occupied').length || 0;
      const maintenanceSlots = sites?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      // Count active RVs (occupied slots with assets)
      const { data: activeRVs, error: rvsError } = await supabase
        .from('assets')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .eq('status', 'occupied');

      if (rvsError) {
        console.error('Error fetching active RVs:', rvsError);
        throw rvsError;
      }

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
        occupancyRate,
        activeRVs: activeRVs?.length || 0
      };
    },
    enabled: !!organizationId && !!accountId
  });
}