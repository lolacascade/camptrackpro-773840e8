
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset, AssetStatus } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

export function useAssets() {
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();

  return useQuery({
    queryKey: ["assets", organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        console.log('Missing organization context:', { organizationId, accountId });
        return [];
      }

      console.log('Fetching assets with:', { organizationId, accountId });

      const { data, error } = await supabase
        .from("assets")
        .select(`
          *,
          customer:customers (
            id,
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            country,
            postal_code,
            created_at,
            updated_at,
            user_id,
            organization_id,
            account_id
          ),
          site:sites (
            id,
            name,
            status,
            location_identifier,
            length_ft,
            width_ft,
            is_covered,
            has_water,
            electricity_voltage,
            utility_connection_type,
            location_coordinates,
            customer_id,
            maintenance_id,
            created_at,
            updated_at,
            last_activity_at,
            user_id,
            organization_id,
            account_id
          )
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching assets:', error);
        throw error;
      }

      const typedData = (data || []).map(asset => ({
        ...asset,
        status: (asset.status || 'available') as AssetStatus,
      })) as Asset[];

      console.log('Fetched assets:', typedData);

      return typedData;
    },
    enabled: !!organizationId && !!accountId && !isLoadingOrg
  });
}
