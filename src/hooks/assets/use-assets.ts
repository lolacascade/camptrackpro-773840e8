import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";

export function useAssets() {
  const session = useSession();

  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
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

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!session?.user?.id,
  });
}