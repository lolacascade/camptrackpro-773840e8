import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useCustomersToday() {
  const session = useSession();

  return useQuery({
    queryKey: ['customersToday'],
    queryFn: async () => {
      console.log('Fetching customers checking in today...');
      
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('check_in_date', today);
      
      if (error) {
        console.error('Error fetching today\'s bookings:', error);
        throw error;
      }
      
      const uniqueCustomers = new Set(data?.map(booking => booking.customer_id));
      const customerCount = uniqueCustomers.size;
      
      console.log(`Found ${customerCount} customers checking in today`);
      
      return customerCount === 0 ? '0' : customerCount.toString();
    },
    enabled: !!session?.user?.id
  });
}