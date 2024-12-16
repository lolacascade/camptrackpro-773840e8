import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths } from "date-fns";
import { processCustomerData } from "../utils/processCustomerData";

export const useCustomerStats = () => {
  const { data: customerStats, isLoading } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      const today = new Date();
      const fiveMonthsAgo = subMonths(startOfMonth(today), 5);
      
      const { data, error } = await supabase
        .from('customers')
        .select('created_at, lifetime_value')
        .gte('created_at', fiveMonthsAgo.toISOString())
        .order('created_at');

      if (error) throw error;
      return data;
    }
  });

  const chartData = customerStats ? processCustomerData(customerStats) : [];
  const today = new Date();
  const currentMonthData = chartData.find(data => {
    const [month, year] = data.month.split(' ');
    return (
      parseInt(year) === today.getFullYear() &&
      month === today.toLocaleString('default', { month: 'short' })
    );
  });

  return {
    chartData,
    currentMonthData,
    isLoading
  };
};