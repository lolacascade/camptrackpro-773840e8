import { addMonths, startOfMonth, subMonths, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { ChartData } from "../types";

export const processCustomerData = async () => {
  const data: ChartData[] = [];
  const today = new Date();
  const startDate = subMonths(startOfMonth(today), 5); // Past 5 months
  const endDate = addMonths(startOfMonth(today), 2);   // Next 2 months of projections

  // Initialize all months in our range with zero values
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const monthKey = format(currentDate, 'MMM yyyy');
    data.push({
      date: currentDate,
      month: format(currentDate, 'MMM'),
      year: format(currentDate, 'yyyy'),
      newCustomers: 0,
      existingCustomers: 0,
      isProjected: currentDate > today
    });
    currentDate = addMonths(currentDate, 1);
  }

  // Process actual data for past and current months
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    if (!entry.isProjected) {
      const monthStart = startOfMonth(entry.date);
      const monthEnd = addMonths(monthStart, 1);

      // Get new customers for this month
      const { data: newCustomers, error: newError } = await supabase
        .from('customers')
        .select('id')
        .gte('created_at', monthStart.toISOString())
        .lt('created_at', monthEnd.toISOString());

      if (newError) {
        console.error('Error fetching new customers:', newError);
        continue;
      }

      // Get all active leases during this month
      const { data: activeLeases, error: activeError } = await supabase
        .from('bookings')
        .select('customer_id, check_in_date, check_out_date')
        .lte('check_in_date', monthEnd.toISOString())  // Lease starts before or during this month
        .gte('check_out_date', monthStart.toISOString()) // Lease ends after or during this month
        .neq('status', 'cancelled');

      if (activeError) {
        console.error('Error fetching active leases:', activeError);
        continue;
      }

      // Filter out new customers from active leases to get existing customers
      const newCustomerIds = new Set(newCustomers?.map(c => c.id) || []);
      const existingCustomerIds = new Set(
        activeLeases
          ?.map(lease => lease.customer_id)
          .filter(id => !newCustomerIds.has(id)) || []
      );

      entry.newCustomers = newCustomerIds.size;
      entry.existingCustomers = existingCustomerIds.size;
    } else {
      // For projected months, estimate based on average growth and retention
      const lastThreeMonths = data.slice(Math.max(0, i - 3), i);
      if (lastThreeMonths.length > 0) {
        const avgNewCustomers = Math.round(
          lastThreeMonths.reduce((acc, curr) => acc + curr.newCustomers, 0) / lastThreeMonths.length
        );
        const avgExistingCustomers = Math.round(
          lastThreeMonths.reduce((acc, curr) => acc + curr.existingCustomers, 0) / lastThreeMonths.length
        );
        
        // Assume modest growth for projections
        entry.newCustomers = Math.round(avgNewCustomers * 1.05); // 5% growth
        entry.existingCustomers = Math.round(avgExistingCustomers * 1.02); // 2% growth in retention
      }
    }
  }
  
  return data;
};