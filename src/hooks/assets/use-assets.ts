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
          slots:slot_id(id, name, dock)
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;
      return data as Asset[];
    },
    enabled: !!session,
  });
}