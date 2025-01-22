import { useQuery } from "@tanstack/react-query";
import { processCustomerData } from "@/components/customers/insights/utils/processCustomerData";
import { format } from "date-fns";
import { ChartData } from "@/components/customers/insights/types";

export const useCustomerStats = (customerId?: string) => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['customer-stats', customerId],
    queryFn: processCustomerData,
    enabled: !!customerId
  });

  const today = new Date();
  const currentMonth = format(today, 'MMM yyyy');
  
  const currentMonthData = (chartData as ChartData[])?.find(data => {
    if (!data?.month || !data?.year) return false;
    return `${data.month} ${data.year}` === currentMonth;
  });

  return {
    data: {
      totalBookings: currentMonthData?.newCustomers || 0,
      activeBookings: currentMonthData?.existingCustomers || 0,
      totalSpent: 0, // This will need to be calculated from actual booking data
      avgBookingValue: 0 // This will need to be calculated from actual booking data
    },
    chartData: chartData as ChartData[] || [],
    currentMonthData,
    isLoading
  };
};