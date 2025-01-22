import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export function useCustomersToday() {
  return useQuery({
    queryKey: ['customers-today'],
    queryFn: async () => {
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data: checkIns } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('check_in_date', today);

      const { data: checkOuts } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('check_out_date', today);

      return {
        checkIns: checkIns?.length || 0,
        checkOuts: checkOuts?.length || 0
      };
    }
  });
}