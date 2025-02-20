
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "./use-organization";

interface SiteSummary {
  totalSites: number;
  availableSites: number;
  occupiedSites: number;
  occupancyRate: number;
}

export function useSiteSummary() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ['site-summary', organizationId, accountId],
    queryFn: async (): Promise<SiteSummary> => {
      if (!organizationId || !accountId) {
        return {
          totalSites: 0,
          availableSites: 0,
          occupiedSites: 0,
          occupancyRate: 0
        };
      }

      // Get all sites
      const { data: sites, error: sitesError } = await supabase
        .from('sites')
        .select('id')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (sitesError) throw sitesError;

      // Get occupied sites (sites with active bookings)
      const { data: occupiedSites, error: bookingsError } = await supabase
        .from('bookings')
        .select('site_id')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .eq('status', 'confirmed')
        .is('site_id', 'not.null');

      if (bookingsError) throw bookingsError;

      const totalSites = sites?.length || 0;
      const occupied = occupiedSites?.length || 0;
      const available = totalSites - occupied;
      const rate = totalSites ? Math.round((occupied / totalSites) * 100) : 0;

      return {
        totalSites,
        availableSites: available,
        occupiedSites: occupied,
        occupancyRate: rate
      };
    },
    enabled: !!organizationId && !!accountId
  });
}
