import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth } from "date-fns";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";
import { generateMonthlyData } from "./insights/utils";

export function CustomerInsights() {
  // Get current month's customers with proper ISO string formatting
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const threeMonthsAgo = subMonths(new Date(), 3);

  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      console.log('Fetching customer stats...');
      
      // Get current month's total customers
      const { data: currentMonthCustomers, error: currentError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', currentMonthEnd.toISOString());

      if (currentError) {
        console.error('Current month error:', currentError);
        throw currentError;
      }

      // Get last month's total customers
      const { data: lastMonthCustomers, error: lastError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', lastMonthEnd.toISOString());

      if (lastError) {
        console.error('Last month error:', lastError);
        throw lastError;
      }

      // Get active customers (created in last 3 months)
      const { data: activeCustomers, error: activeError } = await supabase
        .from('customers')
        .select('id')
        .gte('created_at', threeMonthsAgo.toISOString());

      if (activeError) {
        console.error('Active customers error:', activeError);
        throw activeError;
      }

      console.log('Current month customers:', currentMonthCustomers?.length);
      console.log('Last month customers:', lastMonthCustomers?.length);
      console.log('Active customers:', activeCustomers?.length);

      const currentTotal = currentMonthCustomers?.length || 0;
      const lastTotal = lastMonthCustomers?.length || 0;
      const activeTotal = activeCustomers?.length || 0;
      const inactiveTotal = currentTotal - activeTotal;

      const percentageChange = lastTotal > 0 
        ? ((currentTotal - lastTotal) / lastTotal) * 100 
        : 0;

      return {
        currentTotal,
        lastTotal,
        activeTotal,
        inactiveTotal,
        percentageChange: Math.round(percentageChange * 10) / 10 // Round to 1 decimal
      };
    }
  });

  const chartData = generateMonthlyData();
  const currentMonthData = chartData.find(data => 
    data.month === new Date().toLocaleString('default', { month: 'short' })
  );

  return (
    <div className="space-y-6">
      <CustomerStatsCards customerStats={customerStats} />
      <CustomerAcquisitionChart chartData={chartData} currentMonthData={currentMonthData} />
    </div>
  );
}