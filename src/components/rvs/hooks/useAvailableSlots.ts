
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RV } from "@/types/rv";
import { useOrganization } from "@/hooks/use-organization";

export function useAvailableSlots(rv?: RV) {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["available-slots", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return [];

      const { data: sites, error } = await supabase
        .from("sites")
        .select("id, name")
        .eq("organization_id", organizationId)
        .eq("account_id", accountId);

      if (error) {
        console.error("Error fetching available slots:", error);
        throw error;
      }

      return sites.map(site => ({
        value: site.id,
        label: site.name
      }));
    },
    enabled: !!organizationId && !!accountId
  });
}
