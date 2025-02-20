
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";
import { useOrganization } from "./use-organization";

export function useBookings() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ['bookings', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          rv:rvs(*),
          site:sites(*)
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      return data as Booking[];
    },
    enabled: !!organizationId && !!accountId
  });
}
