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
            dock
          )
        `)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return (data || []).map((asset): Asset => ({
        ...asset,
        user_id: asset.user_id || null,
        customers: asset.customers ? {
          ...asset.customers,
          id: String(asset.customers.id)
        } : null,
        slots: asset.slots ? {
          ...asset.slots,
          id: String(asset.slots.id),
          user_id: null, // Add missing user_id field
          created_at: new Date().toISOString(), // Add missing created_at field
          updated_at: new Date().toISOString(), // Add missing updated_at field
          status: 'available', // Add missing status field
          location_identifier: '', // Add missing location_identifier field
        } : null
      }));
    },
    enabled: !!session?.user?.id,
  });
}