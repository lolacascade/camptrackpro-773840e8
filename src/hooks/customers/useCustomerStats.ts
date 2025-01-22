import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";

export function useCustomerStats(customerId?: string) {
  return useQuery({
    queryKey: ['customer-stats', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', customerId);

      const totalSpent = bookings?.reduce((acc, booking) => acc + Number(booking.total_amount), 0) || 0;

      return {
        totalBookings: bookings?.length || 0,
        activeBookings: bookings?.filter(b => b.status === 'confirmed').length || 0,
        totalSpent,
        avgBookingValue: bookings?.length ? totalSpent / bookings.length : 0
      };
    },
    enabled: !!customerId
  });
}