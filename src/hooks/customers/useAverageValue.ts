import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useAverageValue() {
  const session = useSession();

  return useQuery({
    queryKey: ['customerAverageValue'],
    queryFn: async () => {
      // First get the user's customers
      const { data: customers, error: customersError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', session?.user?.id);

      if (customersError) throw customersError;
      
      if (!customers || customers.length === 0) return '$0.00';
      
      const customerIds = customers.map(c => c.id);
      
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select('amount, booking_id')
        .eq('status', 'paid')
        .in('customer_id', customerIds)
        .not('booking_id', 'is', null);
      
      if (invoicesError) throw invoicesError;
      
      if (!invoices || invoices.length === 0) return '$0.00';
      
      const totalAmount = invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
      const uniqueBookings = new Set(invoices.map(invoice => invoice.booking_id)).size;
      
      const average = totalAmount / uniqueBookings;
      return average.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    enabled: !!session?.user?.id
  });
}