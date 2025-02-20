
import { useQuery } from "@tanstack/react-query";
import { getSitesByOrganization } from "@/services/SiteService";
import { useOrganization } from "@/hooks/use-organization";

export function useSites() {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["sites", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }
      return getSitesByOrganization(organizationId, accountId);
    },
    enabled: !!organizationId && !!accountId
  });
}
