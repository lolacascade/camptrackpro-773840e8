import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";
import { addMonths, subMonths, startOfMonth, endOfMonth } from "date-fns";

export function CustomerInsights() {
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
  const startDate = subMonths(startOfMonth(today), 5); // Past 5 months
  const endDate = addMonths(startOfMonth(today), 6);   // Next 6 months (projections)

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
  const chartData = Array.from(monthlyData.values()).map((data, index, array) => {
    // Calculate existing customers (cumulative from previous months)
    if (index > 0) {
      const prevMonth = array[index - 1];
      data.existingCustomers = prevMonth.existingCustomers + prevMonth.newCustomers;
    }

    // Keep track of the last actual month for projections
    if (!data.isProjected) {
      lastActualMonth = data;
    }

    // If this is a projected month, estimate new customers
    if (data.isProjected && lastActualMonth) {
      // Calculate average growth from last 3 actual months
      const lastThreeMonths = array
        .slice(Math.max(0, index - 3), index)
        .filter(m => !m.isProjected);
      
      if (lastThreeMonths.length > 0) {
        const avgGrowth = lastThreeMonths.reduce((sum, m) => sum + m.newCustomers, 0) / lastThreeMonths.length;
        // Add 10% growth month over month for projections
        const monthsIntoFuture = array.slice(0, index).filter(m => m.isProjected).length + 1;
        data.newCustomers = Math.round(avgGrowth * Math.pow(1.1, monthsIntoFuture));
      } else {
        // Fallback if we don't have enough historical data
        data.newCustomers = Math.round(lastActualMonth.newCustomers * Math.pow(1.1, 1));
      }
    }

    return data;
  });

  return (
    <div className="space-y-6">
      <CustomerStatsCards />
      <CustomerAcquisitionChart 
        chartData={chartData}
        currentMonthData={chartData.find(data => {
          const [month, year] = data.month.split(' ');
          return (
            parseInt(year) === today.getFullYear() &&
            month === today.toLocaleString('default', { month: 'short' })
          );
        })}
      />
    </div>
  );
}
