import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { DollarSign, TrendingUp, PieChart, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function FinancialsStatsCards() {
  const { data: stats } = useQuery({
    queryKey: ['expense-stats'],
    queryFn: async () => {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      // Get current month's expenses
      const { data: currentExpenses } = await supabase
        .from('expenses')
        .select('amount, category')
        .gte('date', firstDayOfMonth.toISOString())
        .lte('date', lastDayOfMonth.toISOString());

      // Get previous month's expenses
      const { data: previousExpenses } = await supabase
        .from('expenses')
        .select('amount')
        .gte('date', new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).toISOString())
        .lte('date', new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).toISOString());

      // Get monthly budget
      const { data: budgets } = await supabase
        .from('monthly_budgets')
        .select('amount')
        .eq('month', firstDayOfMonth.toISOString().split('T')[0])
        .single();

      const currentTotal = currentExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
      const previousTotal = previousExpenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
      const monthlyBudget = budgets?.amount || 0;

      // Calculate category percentages
      const categoryTotals: { [key: string]: number } = {};
      currentExpenses?.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });

      const largestExpense = currentExpenses?.reduce((max, exp) => 
        exp.amount > max.amount ? exp : max, 
        { amount: 0, category: 'None' }
      );

      return {
        currentTotal,
        previousTotal,
        monthlyBudget,
        categoryTotals,
        largestExpense
      };
    }
  });

  const percentageChange = stats?.previousTotal 
    ? ((stats.currentTotal - stats.previousTotal) / stats.previousTotal) * 100 
    : 0;

  const budgetStatus = stats?.monthlyBudget 
    ? ((stats.currentTotal / stats.monthlyBudget) * 100)
    : 0;

  const categoryBreakdown = stats?.categoryTotals 
    ? Object.entries(stats.categoryTotals).map(([category, amount]) => ({
        label: category,
        value: `$${amount.toLocaleString()}`,
        percentage: Math.round((amount / stats.currentTotal) * 100)
      }))
    : [];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Expenses"
        value={`$${stats?.currentTotal.toLocaleString() || '0'}`}
        icon={DollarSign}
        trend={{
          value: `${Math.abs(percentageChange).toFixed(1)}%`,
          isPositive: percentageChange <= 0,
          comparedTo: "last month"
        }}
        breakdown={categoryBreakdown.slice(0, 2)}
      />
      <EnhancedStatCard
        title="Largest Expense"
        value={`$${stats?.largestExpense.amount.toLocaleString() || '0'}`}
        icon={TrendingUp}
        breakdown={[
          { label: "Category", value: stats?.largestExpense.category || 'None' },
          { label: "% of Total", value: `${Math.round((stats?.largestExpense.amount / (stats?.currentTotal || 1)) * 100)}%` }
        ]}
      />
      <EnhancedStatCard
        title="Expense Categories"
        value={`${categoryBreakdown.length || 0}`}
        icon={PieChart}
        breakdown={categoryBreakdown}
      />
      <EnhancedStatCard
        title="Budget Status"
        value={`${budgetStatus.toFixed(1)}%`}
        icon={AlertCircle}
        trend={{
          value: `${Math.abs(100 - budgetStatus).toFixed(1)}%`,
          isPositive: budgetStatus <= 100,
          comparedTo: "monthly budget"
        }}
        breakdown={[
          { label: "Spent", value: `$${stats?.currentTotal.toLocaleString() || '0'}` },
          { label: "Budget", value: `$${stats?.monthlyBudget.toLocaleString() || '0'}` }
        ]}
      />
    </div>
  );
}