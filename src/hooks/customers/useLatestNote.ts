import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useLatestNote() {
  const session = useSession();

  return useQuery({
    queryKey: ['latestNote'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_notes')
        .select('note, tag')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      return data[0] ? `${data[0].tag}: ${data[0].note}` : 'No notes yet';
    },
    enabled: !!session?.user?.id
  });
}