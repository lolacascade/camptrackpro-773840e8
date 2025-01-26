import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { useProfile } from "@/hooks/use-profile";
import { useOrganization } from "@/hooks/use-organization";

export function useAssets() {
  const session = useSession();
  const { data: profile } = useProfile();
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["assets", session?.user?.id, organizationId, accountId],
    queryFn: async (): Promise<Asset[]> => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      if (!profile) {
        throw new Error("No user profile found");
      }

      if (!organizationId || !accountId) {
        throw new Error("No organization or account context found");
      }

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
            user_id
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
      
      return (data || []).map((asset): Asset => ({
        id: String(asset.id),
        name: asset.name,
        type: asset.type,
        status: asset.status as 'available' | 'occupied' | 'maintenance',
        daily_rate: asset.daily_rate,
        asset_name: asset.asset_name,
        asset_size: asset.asset_size,
        asset_type: asset.asset_type,
        site_id: asset.site_id,
        customer_id: asset.customer_id,
        customer: asset.customer ? {
          id: String(asset.customer.id),
          first_name: asset.customer.first_name,
          last_name: asset.customer.last_name,
          email: asset.customer.email,
          phone: asset.customer.phone,
          address: asset.customer.address,
          city: asset.customer.city,
          state: asset.customer.state,
          country: asset.customer.country,
          postal_code: asset.customer.postal_code,
          user_id: asset.customer.user_id,
          created_at: new Date(asset.customer.created_at).toISOString(),
          updated_at: new Date(asset.customer.updated_at).toISOString()
        } : null,
        site: asset.site ? {
          id: Number(asset.site.id),
          name: asset.site.name,
          status: asset.site.status as 'available' | 'occupied' | 'maintenance',
          location_identifier: asset.site.location_identifier,
          length_ft: asset.site.length_ft,
          width_ft: asset.site.width_ft,
          is_covered: asset.site.is_covered,
          has_water: asset.site.has_water,
          electricity_voltage: asset.site.electricity_voltage,
          utility_connection_type: asset.site.utility_connection_type,
          location_coordinates: asset.site.location_coordinates,
          customer_id: asset.site.customer_id,
          maintenance_id: asset.site.maintenance_id,
          user_id: asset.site.user_id,
          created_at: new Date(asset.site.created_at).toISOString(),
          updated_at: new Date(asset.site.updated_at).toISOString(),
          last_activity_at: asset.site.last_activity_at ? new Date(asset.site.last_activity_at).toISOString() : null
        } : null,
        user_id: asset.user_id,
        organization_id: asset.organization_id,
        account_id: asset.account_id,
        created_at: new Date(asset.created_at).toISOString(),
        updated_at: new Date(asset.updated_at).toISOString()
      }));
    },
    enabled: !!session?.user?.id && !!organizationId && !!accountId,
  });
}