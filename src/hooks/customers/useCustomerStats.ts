import { useQuery } from "@tanstack/react-query";
import { processCustomerData } from "../utils/processCustomerData";
import { format } from "date-fns";

export const useCustomerStats = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: processCustomerData
  });

  const today = new Date();
  const currentMonth = format(today, 'MMM yyyy');
  
  const currentMonthData = chartData?.find(data => {
    if (!data?.month || !data?.year) return false;
    return `${data.month} ${data.year}` === currentMonth;
  });

  return {
    chartData: chartData || [],
    currentMonthData,
    isLoading
  };
};