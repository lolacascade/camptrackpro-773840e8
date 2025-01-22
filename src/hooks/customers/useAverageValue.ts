import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAverageValue(customerId?: string) {
  return useQuery({
    queryKey: ['average-value', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('total_amount')
        .eq('customer_id', customerId);

      if (!bookings?.length) return 0;

      const totalValue = bookings.reduce((acc, booking) => acc + Number(booking.total_amount), 0);
      return totalValue / bookings.length;
    },
    enabled: !!customerId
  });
}