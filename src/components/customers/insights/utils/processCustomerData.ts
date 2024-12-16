import { addMonths, startOfMonth, subMonths } from "date-fns";
import { Customer } from "@/types/customer";
import { ChartData } from "../types";

export const processCustomerData = (customerStats: any[] | null) => {
  const today = new Date();
  const startDate = subMonths(startOfMonth(today), 5); // Past 5 months
  const endDate = addMonths(startOfMonth(today), 7);   // Next 6 months of projections (adding 7 to include current month)

  const monthlyData = new Map();

  // Initialize all months in our range with zero values
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const monthKey = currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyData.set(monthKey, {
      month: monthKey,
      year: currentDate.getFullYear().toString(),
      newCustomers: 0,
      existingCustomers: 0,
      isProjected: currentDate > today
    });
    currentDate = addMonths(currentDate, 1);
  }

  // Process actual customer data
  customerStats?.forEach(customer => {
    const date = new Date(customer.created_at);
    if (date >= startDate && date <= today) {
      const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      const monthData = monthlyData.get(monthKey);
      if (monthData) {
        monthData.newCustomers += 1;
      }
    }
  });

  // Calculate cumulative customers and add projections
  let lastActualMonth = null;
  let lastActualCustomers = 0;
  
  return Array.from(monthlyData.values()).map((data: any, index, array) => {
    // Calculate existing customers (cumulative from previous months)
    if (index > 0) {
      const prevMonth = array[index - 1];
      data.existingCustomers = prevMonth.existingCustomers + prevMonth.newCustomers;
    }

    // Keep track of the last actual month for projections
    if (!data.isProjected) {
      lastActualMonth = data;
      lastActualCustomers = data.newCustomers;
    } else if (lastActualMonth) {
      // For projected months, apply 10% growth compounded monthly
      const monthsSinceLastActual = array
        .slice(0, index)
        .filter(m => m.isProjected)
        .length;
      
      // Calculate projected new customers with compound growth
      data.newCustomers = Math.round(
        lastActualCustomers * Math.pow(1.1, monthsSinceLastActual)
      );
    }

    return data;
  });
};
