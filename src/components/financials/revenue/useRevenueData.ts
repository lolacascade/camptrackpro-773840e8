
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { format, differenceInDays, eachDayOfInterval } from "date-fns";
import { MonthlyFinancials } from "./types";

export function useRevenueData(dateRange: { from: Date; to: Date }) {
  const { organizationId, accountId } = useOrganization();
  const daysDifference = differenceInDays(dateRange.to, dateRange.from);
  const showDailyData = daysDifference <= 31;

  return useQuery({
    queryKey: ['financial-data', organizationId, accountId, dateRange.from, dateRange.to, showDailyData],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const [bookingsResponse, expensesResponse] = await Promise.all([
        supabase
          .from('bookings')
          .select('total_amount, created_at')
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString())
          .eq('organization_id', organizationId)
          .eq('account_id', accountId),
        
        supabase
          .from('expenses')
          .select('amount, date')
          .gte('date', dateRange.from.toISOString())
          .lte('date', dateRange.to.toISOString())
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
      ]);

      if (bookingsResponse.error) throw bookingsResponse.error;
      if (expensesResponse.error) throw expensesResponse.error;

      const data: { [key: string]: MonthlyFinancials } = {};
      
      // Initialize all dates in the range
      eachDayOfInterval({ start: dateRange.from, end: dateRange.to }).forEach(date => {
        const key = format(date, showDailyData ? 'yyyy-MM-dd' : 'yyyy-MM');
        const displayFormat = showDailyData ? 'MMM dd' : 'MMM yyyy';
        
        if (!data[key]) {
          data[key] = {
            month: format(date, displayFormat),
            year: format(date, 'yyyy'),
            income: 0,
            expenses: 0,
            netProfit: 0
          };
        }
      });

      // Aggregate booking income
      bookingsResponse.data?.forEach(booking => {
        const date = new Date(booking.created_at);
        const key = format(date, showDailyData ? 'yyyy-MM-dd' : 'yyyy-MM');
        if (data[key]) {
          data[key].income += Number(booking.total_amount || 0);
        }
      });

      // Aggregate expenses
      expensesResponse.data?.forEach(expense => {
        const date = new Date(expense.date);
        const key = format(date, showDailyData ? 'yyyy-MM-dd' : 'yyyy-MM');
        if (data[key]) {
          data[key].expenses += Number(expense.amount);
        }
      });

      // Calculate net profit and convert to array
      return Object.entries(data)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([_, value]) => ({
          ...value,
          netProfit: value.income - value.expenses
        }));
    },
    enabled: !!organizationId && !!accountId,
  });
}
