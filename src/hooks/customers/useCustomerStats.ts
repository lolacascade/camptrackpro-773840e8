import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCustomerStats = (customerId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['customer-stats', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', customerId);

      return {
        totalBookings: bookings?.length || 0,
        activeBookings: bookings?.filter(b => b.status === 'confirmed').length || 0,
      };
    },
    enabled: !!customerId
  });

  return {
    data,
    isLoading
  };
};