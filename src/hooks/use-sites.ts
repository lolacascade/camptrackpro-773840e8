
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Site } from "@/types/site";
import { useOrganization } from "./use-organization";

export function useSites() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ['sites', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      return data as Site[];
    },
    enabled: !!organizationId && !!accountId
  });
}
