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
      
      return (data || []) as Asset[];
    },
    enabled: !!session?.user?.id,
  });
}