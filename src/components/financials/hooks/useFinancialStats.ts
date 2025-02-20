
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/hooks/use-supabase-client";
import { useOrganization } from "@/hooks/use-organization";
import type { FinancialStats, DateRange } from "../types/financial-stats";

export function useFinancialStats(dateRange: DateRange) {
  const supabase = useSupabaseClient();
  const { organizationId, accountId } = useOrganization();

  return useQuery<FinancialStats | null>({
    queryKey: ['expense-stats', dateRange.from, dateRange.to, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return null;

      // Commenting out financial queries until tables are created
      // const [currentExpenses, currentInvoices, budgets] = await Promise.all([
      //   supabase
      //     .from('expenses')
      //     .select('amount, category')
      //     .eq('organization_id', organizationId)
      //     .eq('account_id', accountId)
      //     .gte('date', format(dateRange.from, 'yyyy-MM-dd'))
      //     .lte('date', format(dateRange.to, 'yyyy-MM-dd')),
      //   supabase
      //     .from('invoices')
      //     .select('amount, type')
      //     .eq('organization_id', organizationId)
      //     .eq('account_id', accountId)
      //     .eq('status', 'paid')
      //     .gte('created_at', format(dateRange.from, 'yyyy-MM-dd'))
      //     .lte('created_at', format(dateRange.to, 'yyyy-MM-dd')),
      //   supabase
      //     .from('monthly_budgets')
      //     .select('amount')
      //     .eq('organization_id', organizationId)
      //     .eq('account_id', accountId)
      //     .gte('month', format(dateRange.from, 'yyyy-MM-01'))
      //     .lte('month', format(dateRange.to, 'yyyy-MM-01'))
      // ]);

      return {
        currentTotal: 0,
        previousTotal: 0,
        currentRevenue: 0,
        previousRevenue: 0,
        totalBudget: 0,
        categoryTotals: {},
        revenueByType: {},
        largestExpense: { amount: 0, category: 'None' }
      };
    },
    enabled: !!organizationId && !!accountId
  });
}
