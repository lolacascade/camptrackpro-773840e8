import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from "date-fns";

export function useAverageStayDuration(customerId?: string) {
  return useQuery({
    queryKey: ['average-stay-duration', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('check_in_date, check_out_date')
        .eq('customer_id', customerId);

      if (!bookings?.length) return 0;

      const totalDays = bookings.reduce((acc, booking) => {
        const days = differenceInDays(
          new Date(booking.check_out_date),
          new Date(booking.check_in_date)
        );
        return acc + days;
      }, 0);

      return totalDays / bookings.length;
    },
    enabled: !!customerId
  });
}