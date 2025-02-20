
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

      // Commenting out bookings and expenses queries until tables are created
      // const [bookingsResponse, expensesResponse] = await Promise.all([
      //   supabase
      //     .from('bookings')
      //     .select('total_amount, created_at')
      //     .gte('created_at', dateRange.from.toISOString())
      //     .lte('created_at', dateRange.to.toISOString())
      //     .eq('organization_id', organizationId)
      //     .eq('account_id', accountId),
      //   
      //   supabase
      //     .from('expenses')
      //     .select('amount, date')
      //     .gte('date', dateRange.from.toISOString())
      //     .lte('date', dateRange.to.toISOString())
      //     .eq('organization_id', organizationId)
      //     .eq('account_id', accountId)
      // ]);

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

      return Object.entries(data)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([_, value]) => value);
    },
    enabled: !!organizationId && !!accountId,
  });
}
