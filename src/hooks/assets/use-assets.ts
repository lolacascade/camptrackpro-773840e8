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
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Transform the data to match our Asset type
      const transformedData = data?.map(item => ({
        ...item,
        customers: item.customers?.[0] || null,
        slots: item.slots?.[0] || null
      }));

      return transformedData as Asset[];
    },
    enabled: !!session,
  });
}