import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useAverageValue() {
  const session = useSession();

  return useQuery({
    queryKey: ['customerAverageValue'],
    queryFn: async () => {
      console.log('Calculating average revenue per stay...');
      
      // Get all paid invoices with their booking details
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select(`
          amount,
          booking_id,
          status
        `)
        .eq('status', 'paid')
        .not('booking_id', 'is', null);

      if (invoicesError) {
        console.error('Error fetching invoices:', invoicesError);
        throw invoicesError;
      }

      if (!invoices || invoices.length === 0) {
        console.log('No paid invoices found');
        return '$0.00';
      }

      // Calculate total amount and count of bookings
      const totalAmount = invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
      const totalBookings = invoices.length;

      console.log(`Total amount: ${totalAmount}, Total bookings: ${totalBookings}`);

      // Calculate average per stay
      const average = totalAmount / totalBookings;
      
      return average.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    enabled: !!session?.user?.id
  });
}