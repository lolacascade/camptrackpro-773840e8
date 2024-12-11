import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useAverageValue() {
  const session = useSession();

  return useQuery({
    queryKey: ['customerAverageValue'],
    queryFn: async () => {
      console.log('Calculating average value...');
      
      // Get all paid invoices with their amounts
      const { data: invoices, error: invoicesError } = await supabase
        .from('invoices')
        .select(`
          amount,
          customer_id,
          status
        `)
        .eq('status', 'paid');

      if (invoicesError) {
        console.error('Error fetching invoices:', invoicesError);
        throw invoicesError;
      }

      console.log('Fetched invoices:', invoices);

      if (!invoices || invoices.length === 0) {
        console.log('No paid invoices found');
        return '$0.00';
      }

      // Calculate total amount and count of paid invoices
      const totalAmount = invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
      const totalInvoices = invoices.length;

      console.log('Total amount:', totalAmount, 'Total invoices:', totalInvoices);

      // Calculate average
      const average = totalAmount / totalInvoices;
      
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