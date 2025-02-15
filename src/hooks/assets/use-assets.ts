
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

export function useAssets() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["assets", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      const { data, error } = await supabase
        .from("assets")
        .select("*, customer:customers (*), site:sites (*)")
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching assets:', error);
        throw error;
      }

      return (data || []) as Asset[];
    },
    enabled: !!organizationId && !!accountId
  });
}
