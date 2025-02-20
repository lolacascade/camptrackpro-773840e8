
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { RV } from "@/types/rv";
import { useOrganization } from "@/hooks/use-organization";

export function useRVs() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["rvs", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      const { data, error } = await supabase
        .from("rvs")
        .select(`
          *,
          customer:customers(
            id,
            first_name,
            last_name
          ),
          site:sites(
            id,
            name
          )
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching RVs:', error);
        throw error;
      }

      return data as RV[];
    },
    enabled: !!organizationId && !!accountId
  });
}
