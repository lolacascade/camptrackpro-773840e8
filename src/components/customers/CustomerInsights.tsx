import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth } from "date-fns";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";
import { fetchMonthlyCustomerData } from "./insights/utils";
import { useParams } from "react-router-dom";
import { Customer } from "@/types/customer";

export function CustomerInsights() {
  const { id } = useParams();

  const { data: customer } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Customer;
    },
    enabled: !!id
  });

  // Get current month's customers with proper ISO string formatting
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const threeMonthsAgo = subMonths(new Date(), 3);

  const { data: chartData, isLoading: isLoadingChartData } = useQuery({
    queryKey: ['customer-growth-data'],
    queryFn: fetchMonthlyCustomerData
  });

  const currentMonthData = chartData?.find(data => 
    data.month === new Date().toLocaleString('default', { month: 'short' })
  );

  return (
    <div className="space-y-6">
      <CustomerStatsCards customer={customer} />
      {!isLoadingChartData && chartData && (
        <CustomerAcquisitionChart 
          chartData={chartData} 
          currentMonthData={currentMonthData} 
        />
      )}
    </div>
  );
}