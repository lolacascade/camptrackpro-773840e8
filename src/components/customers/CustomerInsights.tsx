import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";

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
  const chartData = customerStats?.reduce((acc, customer) => {
    const date = new Date(customer.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    const monthData = acc.find(d => d.month === monthYear);
    if (monthData) {
      monthData.newCustomers += 1;
    } else {
      acc.push({
        month: monthYear,
        year: date.getFullYear(),
        newCustomers: 1,
        existingCustomers: acc[acc.length - 1]?.existingCustomers || 0,
        isProjected: false
      });
    }
    return acc;
  }, []) || [];

  return (
    <div className="space-y-6">
      <CustomerStatsCards />
      <CustomerAcquisitionChart 
        chartData={chartData}
        currentMonthData={chartData[chartData.length - 1]}
      />
    </div>
  );
}