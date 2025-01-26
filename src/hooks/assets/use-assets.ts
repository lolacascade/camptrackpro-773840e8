import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";

export function useAssets() {
  const session = useSession();
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();

  return useQuery({
    queryKey: ["assets", session?.user?.id, organizationId, accountId],
    queryFn: async (): Promise<Asset[]> => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      if (!organizationId || !accountId) {
        throw new Error("No organization or account context found");
      }

      console.log('Fetching assets with org:', organizationId, 'account:', accountId);

      const query = supabase
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
        .eq('account_id', accountId)
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Ensure the status is one of the allowed values and handle site status
      return (data || []).map(asset => ({
        ...asset,
        status: asset.status as 'available' | 'occupied' | 'maintenance',
        site: asset.site ? {
          ...asset.site,
          status: asset.site.status as 'available' | 'occupied' | 'maintenance'
        } : null
      }));
    },
    enabled: !!session?.user?.id && !!organizationId && !!accountId && !isLoadingOrg,
  });
}