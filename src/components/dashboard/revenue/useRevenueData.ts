import { useQuery } from "@tanstack/react-query";
import { RevenueCategory, RevenueData } from "./types";
import { format, subMonths, addMonths } from "date-fns";

export function useRevenueData(selectedCategory: RevenueCategory) {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue-breakdown', selectedCategory],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMonthlyData();
    }
  });

  const currentDate = new Date();
  const currentMonthData = data?.find(item => 
    format(item.date, 'MMM yyyy') === format(currentDate, 'MMM yyyy')
  );

  return { data, isLoading, currentMonthData };
}

function generateMonthlyData() {
  const currentDate = new Date();
  const data = [];
  
  for (let i = -12; i <= 11; i++) {
    const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
    const monthData = {
      date: date,
      month: format(date, 'MMM'),
      year: format(date, 'yyyy'),
      slipRenewals: Math.random() * 8000 + 2000,
      newSlipRentals: Math.random() * 8000 + 2000,
      maintenanceServices: Math.random() * 3000 + 1000,
      isProjected: i > 0
    };
    data.push(monthData);
  }
  
  return data;
}