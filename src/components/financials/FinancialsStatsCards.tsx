
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { DollarSign, TrendingUp, PieChart, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format, isWithinInterval } from "date-fns";
import { useSupabaseClient } from "@/hooks/use-supabase-client";
import { useOrganization } from "@/hooks/use-organization";

interface FinancialsStatsCardsProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function FinancialsStatsCards({ dateRange }: FinancialsStatsCardsProps) {
  const supabase = useSupabaseClient();
  const { organizationId, accountId } = useOrganization();

  const { data: stats } = useQuery({
    queryKey: ['expense-stats', dateRange.from, dateRange.to, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return null;

      // Calculate previous period
      const periodLength = dateRange.to.getTime() - dateRange.from.getTime();
      const previousFrom = new Date(dateRange.from.getTime() - periodLength);
      const previousTo = new Date(dateRange.to.getTime() - periodLength);

      // Get current period's data
      const [currentExpenses, currentInvoices, budgets] = await Promise.all([
        supabase
          .from('expenses')
          .select('amount, category')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .gte('date', format(dateRange.from, 'yyyy-MM-dd'))
          .lte('date', format(dateRange.to, 'yyyy-MM-dd')),
        supabase
          .from('invoices')
          .select('amount')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('status', 'paid')
          .gte('created_at', format(dateRange.from, 'yyyy-MM-dd'))
          .lte('created_at', format(dateRange.to, 'yyyy-MM-dd')),
        supabase
          .from('monthly_budgets')
          .select('amount')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .gte('month', format(dateRange.from, 'yyyy-MM-01'))
          .lte('month', format(dateRange.to, 'yyyy-MM-01'))
      ]);

      // Get previous period's data
      const [previousExpenses, previousInvoices] = await Promise.all([
        supabase
          .from('expenses')
          .select('amount')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .gte('date', format(previousFrom, 'yyyy-MM-dd'))
          .lte('date', format(previousTo, 'yyyy-MM-dd')),
        supabase
          .from('invoices')
          .select('amount')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('status', 'paid')
          .gte('created_at', format(previousFrom, 'yyyy-MM-dd'))
          .lte('created_at', format(previousTo, 'yyyy-MM-dd'))
      ]);

      const currentTotal = currentExpenses.data?.reduce((sum, exp) => {
        return sum + (typeof exp.amount === 'number' ? exp.amount : 0);
      }, 0) || 0;

      const previousTotal = previousExpenses.data?.reduce((sum, exp) => {
        return sum + (typeof exp.amount === 'number' ? exp.amount : 0);
      }, 0) || 0;

      const currentRevenue = currentInvoices.data?.reduce((sum, inv) => {
        return sum + (typeof inv.amount === 'number' ? inv.amount : 0);
      }, 0) || 0;

      const previousRevenue = previousInvoices.data?.reduce((sum, inv) => {
        return sum + (typeof inv.amount === 'number' ? inv.amount : 0);
      }, 0) || 0;

      const totalBudget = budgets.data?.reduce((sum, budget) => {
        return sum + (typeof budget.amount === 'number' ? budget.amount : 0);
      }, 0) || 0;

      // Calculate category percentages
      const categoryTotals: { [key: string]: number } = {};
      currentExpenses.data?.forEach(exp => {
        if (exp.category && typeof exp.amount === 'number') {
          categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        }
      });

      const largestExpense = currentExpenses.data?.reduce((max, exp) => 
        (typeof exp.amount === 'number' && exp.amount > max.amount) ? exp : max, 
        { amount: 0, category: 'None' }
      );

      return {
        currentTotal,
        previousTotal,
        currentRevenue,
        previousRevenue,
        totalBudget,
        categoryTotals,
        largestExpense
      };
    },
    enabled: !!organizationId && !!accountId
  });

  if (!stats) return null;

  const revenueChange = stats.previousRevenue 
    ? ((stats.currentRevenue - stats.previousRevenue) / stats.previousRevenue) * 100 
    : 0;

  const expenseChange = stats.previousTotal 
    ? ((stats.currentTotal - stats.previousTotal) / stats.previousTotal) * 100 
    : 0;

  const periodLabel = isWithinInterval(new Date(), { start: dateRange.from, end: dateRange.to })
    ? 'current period'
    : format(dateRange.from, 'MMM dd') + ' - ' + format(dateRange.to, 'MMM dd');

  const categoryBreakdown = Object.entries(stats.categoryTotals).map(([category, amount]) => ({
    label: category,
    value: `$${amount.toLocaleString()}`,
    percentage: Math.round((amount / stats.currentTotal) * 100)
  }));

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Revenue"
        value={`$${stats.currentRevenue.toLocaleString()}`}
        icon={DollarSign}
        trend={{
          value: `${Math.abs(revenueChange).toFixed(1)}%`,
          isPositive: revenueChange >= 0,
          comparedTo: "previous period"
        }}
        breakdown={[
          { label: "Current", value: `$${stats.currentRevenue.toLocaleString()}` },
          { label: "Previous", value: `$${stats.previousRevenue.toLocaleString()}` }
        ]}
      />
      <EnhancedStatCard
        title="Total Expenses"
        value={`$${stats.currentTotal.toLocaleString()}`}
        icon={TrendingUp}
        trend={{
          value: `${Math.abs(expenseChange).toFixed(1)}%`,
          isPositive: expenseChange <= 0,
          comparedTo: "previous period"
        }}
        breakdown={categoryBreakdown.slice(0, 2)}
      />
      <EnhancedStatCard
        title="Expense Categories"
        value={`${categoryBreakdown.length}`}
        icon={PieChart}
        breakdown={categoryBreakdown}
      />
      <EnhancedStatCard
        title="Budget Status"
        value={`${((stats.currentTotal / stats.totalBudget) * 100).toFixed(1)}%`}
        icon={AlertCircle}
        trend={{
          value: `${Math.abs(100 - ((stats.currentTotal / stats.totalBudget) * 100)).toFixed(1)}%`,
          isPositive: stats.currentTotal <= stats.totalBudget,
          comparedTo: periodLabel
        }}
        breakdown={[
          { label: "Spent", value: `$${stats.currentTotal.toLocaleString()}` },
          { label: "Budget", value: `$${stats.totalBudget.toLocaleString()}` }
        ]}
      />
    </div>
  );
}
