import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select(`
          *,
          customers:customer_id(id, name),
          slots:slot_id(id, name, dock)
        `);

      if (error) throw error;
      return data as Asset[];
    },
  });
}