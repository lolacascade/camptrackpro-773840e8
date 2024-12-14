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

      // Get total customers up to this month
      const { data: totalCustomers, error: totalError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', endOfMonth.toISOString());

      if (totalError) {
        console.error('Error fetching total customers:', totalError);
        continue;
      }

      const newCount = newCustomers?.length || 0;
      const totalCount = totalCustomers?.length || 0;
      const existingCount = totalCount - newCount;

      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        newCustomers: newCount,
        existingCustomers: existingCount,
        isProjected: false
      });
    } else {
      // For projected months, estimate based on average growth
      const lastThreeMonths = data.slice(-3);
      const avgNewCustomers = Math.round(
        lastThreeMonths.reduce((acc, curr) => acc + curr.newCustomers, 0) / 3
      );
      const lastMonth = data[data.length - 1];
      
      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        newCustomers: Math.round(avgNewCustomers * 1.1), // Assume 10% growth
        existingCustomers: lastMonth.existingCustomers + lastMonth.newCustomers,
        isProjected: true
      });
    }
  }
  
  return data;
};