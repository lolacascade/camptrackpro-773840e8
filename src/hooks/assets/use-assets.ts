import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export function useAssets() {
  const session = useSession();

  return useQuery({
    queryKey: ["assets", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      // Get user role from profiles
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        toast.error("Failed to fetch user profile");
        throw profileError;
      }

      if (!userProfile) {
        console.error('No user profile found');
        toast.error("User profile not found");
        throw new Error("User profile not found");
      }

      const query = supabase
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
        .order('created_at', { ascending: false });

      const { data, error } = await query;

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
          id: Number(asset.slots.id),
          status: asset.slots.status as 'available' | 'occupied' | 'maintenance',
          length_ft: asset.slots.length_ft ? Number(asset.slots.length_ft) : null,
          width_ft: asset.slots.width_ft ? Number(asset.slots.width_ft) : null,
          maintenance_id: asset.slots.maintenance_id ? Number(asset.slots.maintenance_id) : null,
          user_id: asset.slots.user_id || null,
          created_at: new Date(asset.slots.created_at).toISOString(),
          updated_at: new Date(asset.slots.updated_at).toISOString(),
          last_activity_at: asset.slots.last_activity_at ? new Date(asset.slots.last_activity_at).toISOString() : null
        } : null,
        created_at: new Date(asset.created_at).toISOString(),
        updated_at: new Date(asset.updated_at).toISOString()
      }));
    },
    enabled: !!session?.user?.id,
  });
}