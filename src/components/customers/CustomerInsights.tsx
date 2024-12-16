import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";
import { addMonths, subMonths } from "date-fns";

export function CustomerInsights() {
  const { data: customerStats, isLoading } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('created_at, lifetime_value');

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
      </div>
    );
  }

  // Process customer stats for the chart
  const today = new Date();
  const startDate = subMonths(today, 5); // Past 5 months
  const endDate = addMonths(today, 6);    // Next 6 months

  const chartData = customerStats?.reduce((acc, customer) => {
    const date = new Date(customer.created_at);
    
    // Only include data within our date range
    if (date >= startDate && date <= endDate) {
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      const monthData = acc.find(d => d.month === monthYear);
      if (monthData) {
        monthData.newCustomers += 1;
      } else {
        // Calculate existing customers as cumulative sum of previous months
        const existingCustomers = acc.length > 0 
          ? acc[acc.length - 1].newCustomers + acc[acc.length - 1].existingCustomers 
          : 0;

        acc.push({
          month: monthYear,
          year: date.getFullYear().toString(),
          newCustomers: 1,
          existingCustomers,
          isProjected: false
        });
      }
    }
    return acc;
  }, []) || [];

  // Add projected months
  const lastMonth = chartData[chartData.length - 1];
  if (lastMonth) {
    const avgNewCustomers = Math.round(
      chartData.slice(-3).reduce((sum, month) => sum + month.newCustomers, 0) / 3
    );

    for (let i = 1; i <= 6; i++) {
      const projectedDate = addMonths(today, i);
      const monthYear = projectedDate.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      const projectedNewCustomers = Math.round(avgNewCustomers * (1 + (i * 0.1))); // 10% growth per month
      const existingCustomers = chartData[chartData.length - 1].existingCustomers + 
                               chartData[chartData.length - 1].newCustomers;

      chartData.push({
        month: monthYear,
        year: projectedDate.getFullYear().toString(),
        newCustomers: projectedNewCustomers,
        existingCustomers,
        isProjected: true
      });
    }
  }

  return (
    <div className="space-y-6">
      <CustomerStatsCards />
      <CustomerAcquisitionChart 
        chartData={chartData}
        currentMonthData={chartData.find(data => 
          new Date(data.month).getMonth() === today.getMonth() &&
          new Date(data.month).getFullYear() === today.getFullYear()
        )}
      />
    </div>
  );
}