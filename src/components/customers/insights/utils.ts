import { format, subMonths, addMonths } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

export const fetchMonthlyCustomerData = async () => {
  const data = [];
  const today = new Date();
  
  // Fetch data for the last 12 months plus 2 projected months
  for (let i = -12; i <= 2; i++) {
    const date = i === 0 ? today : (i < 0 ? subMonths(today, Math.abs(i)) : addMonths(today, i));
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const isProjected = i > 0;
    
    if (!isProjected) {
      // Get new customers for this month
      const { data: newCustomers, error: newError } = await supabase
        .from('customers')
        .select('id')
        .gte('created_at', startOfMonth.toISOString())
        .lte('created_at', endOfMonth.toISOString());

      if (newError) {
        console.error('Error fetching new customers:', newError);
        continue;
      }

      // Get customers who have renewed bookings this month
      const { data: renewedCustomers, error: renewedError } = await supabase
        .from('bookings')
        .select('customer_id')
        .gte('check_in_date', startOfMonth.toISOString())
        .lte('check_in_date', endOfMonth.toISOString())
        .not('customer_id', 'in', `(${(newCustomers?.map(c => c.id) || []).join(',') || '0'})`)
        .not('status', 'eq', 'cancelled');

      if (renewedError) {
        console.error('Error fetching renewed customers:', renewedError);
        continue;
      }

      // Count unique renewed customers
      const uniqueRenewedCustomers = [...new Set(renewedCustomers?.map(b => b.customer_id) || [])];

      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        newCustomers: newCustomers?.length || 0,
        existingCustomers: uniqueRenewedCustomers.length,
        isProjected: false
      });
    } else {
      // For projected months, estimate based on average growth
      const lastThreeMonths = data.slice(-3);
      const avgNewCustomers = Math.round(
        lastThreeMonths.reduce((acc, curr) => acc + curr.newCustomers, 0) / 3
      );
      const avgRenewedCustomers = Math.round(
        lastThreeMonths.reduce((acc, curr) => acc + curr.existingCustomers, 0) / 3
      );
      
      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        newCustomers: Math.round(avgNewCustomers * 1.1), // Assume 10% growth
        existingCustomers: Math.round(avgRenewedCustomers * 1.05), // Assume 5% growth in renewals
        isProjected: true
      });
    }
  }
  
  return data;
};