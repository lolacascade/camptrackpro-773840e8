
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

export function useAssets() {
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
            last_name,
            email
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

      return (data || []).map(rv => ({
        id: rv.id,
        make: rv.make,
        model: rv.model,
        year: rv.year,
        customer_id: rv.customer_id,
        site_id: rv.site_id,
        organization_id: organizationId,
        account_id: accountId,
        user_id: rv.user_id || '',
        created_at: rv.created_at,
        updated_at: new Date().toISOString(),
        customer: rv.customer,
        site: rv.site
      })) as Asset[];
    },
    enabled: !!organizationId && !!accountId
  });
}
