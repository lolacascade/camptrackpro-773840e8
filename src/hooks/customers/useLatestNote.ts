import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useLatestNote(customerId?: string) {
  return useQuery({
    queryKey: ['latest-note', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data } = await supabase
        .from('customer_notes')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      return data;
    },
    enabled: !!customerId
  });
}