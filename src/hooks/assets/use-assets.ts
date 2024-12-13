import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";

export function useAssets() {
  const session = useSession();

  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session");
      }

      const { data, error } = await supabase
        .from("assets")
        .select(`
          *,
          customers:customer_id(id, name),
          slots:slip_id(id, name, dock)
        `)
        .eq('user_id', session.user.id)
        .returns<Asset[]>();

      if (error) throw error;
      
      return data.map(asset => ({
        ...asset,
        customers: asset.customers || null,
        slots: asset.slots || null
      }));
    },
    enabled: !!session,
  });
}