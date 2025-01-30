import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { format, differenceInDays, isWithinInterval, eachDayOfInterval } from "date-fns";
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

      const [incomeResponse, expensesResponse] = await Promise.all([
        supabase
          .from('invoices')
          .select('amount, created_at')
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString())
          .eq('status', 'paid')
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

      if (incomeResponse.error) throw incomeResponse.error;
      if (expensesResponse.error) throw expensesResponse.error;

      if (showDailyData) {
        const dailyData: { [key: string]: MonthlyFinancials } = {};
        
        eachDayOfInterval({ start: dateRange.from, end: dateRange.to }).forEach(date => {
          const key = format(date, 'yyyy-MM-dd');
          dailyData[key] = {
            month: format(date, 'MMM dd'),
            year: format(date, 'yyyy'),
            income: 0,
            expenses: 0,
            netProfit: 0
          };
        });

        incomeResponse.data?.forEach((invoice) => {
          const date = new Date(invoice.created_at);
          const key = format(date, 'yyyy-MM-dd');
          if (dailyData[key]) {
            dailyData[key].income += Number(invoice.amount);
          }
        });

        expensesResponse.data?.forEach((expense) => {
          const date = new Date(expense.date);
          const key = format(date, 'yyyy-MM-dd');
          if (dailyData[key]) {
            dailyData[key].expenses += Number(expense.amount);
          }
        });

        return Object.values(dailyData).map(data => ({
          ...data,
          netProfit: data.income - data.expenses
        }));
      }

      const monthlyData: { [key: string]: MonthlyFinancials } = {};

      incomeResponse.data?.forEach((invoice) => {
        const date = new Date(invoice.created_at);
        const key = format(date, 'yyyy-MM');
        if (!monthlyData[key]) {
          monthlyData[key] = {
            month: format(date, 'MMM'),
            year: format(date, 'yyyy'),
            income: 0,
            expenses: 0,
            netProfit: 0
          };
        }
        monthlyData[key].income += Number(invoice.amount);
      });

      expensesResponse.data?.forEach((expense) => {
        const date = new Date(expense.date);
        const key = format(date, 'yyyy-MM');
        if (!monthlyData[key]) {
          monthlyData[key] = {
            month: format(date, 'MMM'),
            year: format(date, 'yyyy'),
            income: 0,
            expenses: 0,
            netProfit: 0
          };
        }
        monthlyData[key].expenses += Number(expense.amount);
      });

      return Object.values(monthlyData)
        .map(data => ({
          ...data,
          netProfit: data.income - data.expenses
        }))
        .sort((a, b) => {
          const dateA = new Date(`${a.year} ${a.month}`);
          const dateB = new Date(`${b.year} ${b.month}`);
          return dateA.getTime() - dateB.getTime();
        });
    },
    enabled: !!organizationId && !!accountId,
  });
}