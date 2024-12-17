import { useQuery } from "@tanstack/react-query";
import { processCustomerData } from "../utils/processCustomerData";

export const useCustomerStats = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: processCustomerData
  });

  const today = new Date();
  const currentMonthData = chartData?.find(data => {
    const [month, year] = data.month.split(' ');
    return (
      parseInt(year) === today.getFullYear() &&
      month === today.toLocaleString('default', { month: 'short' })
    );
  });

  return {
    chartData: chartData || [],
    currentMonthData,
    isLoading
  };
};