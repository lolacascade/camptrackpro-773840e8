import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useCustomersToday() {
  const session = useSession();

  return useQuery({
    queryKey: ['customersToday'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          customers (
            name
          )
        `)
        .gte('check_in_date', today.toISOString())
        .lt('check_in_date', new Date(today.getTime() + 86400000).toISOString());

      if (error) throw error;

      if (!data || data.length === 0) {
        return 'No check-ins today';
      }

      const uniqueCustomers = new Set(data.map(booking => booking.customers?.name).filter(Boolean));
      return `${uniqueCustomers.size} check-in${uniqueCustomers.size !== 1 ? 's' : ''} today`;
    },
    enabled: !!session?.user?.id
  });
}