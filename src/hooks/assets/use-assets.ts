import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";

export function useAssets() {
  const session = useSession();

  return useQuery({
    queryKey: ["assets", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from("assets")
        .select(`
          *,
          customers (
            id,
            first_name,
            last_name
          ),
          slots:slip_id (
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
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return (data || []).map((asset): Asset => ({
        ...asset,
        id: String(asset.id),
        user_id: asset.user_id || null,
        customers: asset.customers ? {
          ...asset.customers,
          id: String(asset.customers.id)
        } : null,
        slots: asset.slots ? {
          ...asset.slots,
          id: String(asset.slots.id),
          user_id: asset.slots.user_id || null,
          status: asset.slots.status as 'available' | 'occupied' | 'maintenance'
        } : null
      }));
    },
    enabled: !!session?.user?.id,
  });
}