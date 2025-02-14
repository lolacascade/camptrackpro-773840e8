
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { DollarSign, TrendingUp, PieChart, AlertCircle } from "lucide-react";
import { useFinancialStats } from "./hooks/useFinancialStats";
import { calculateBreakdowns, calculateChanges, getPeriodLabel } from "./utils/calculations";
import type { DateRange } from "./types/financial-stats";

interface FinancialsStatsCardsProps {
  dateRange: DateRange;
}

export function FinancialsStatsCards({ dateRange }: FinancialsStatsCardsProps) {
  const { data: stats } = useFinancialStats(dateRange);

  if (!stats) {
    return null;
  }

  const { revenueChange, expenseChange } = calculateChanges(stats);
  const { categoryBreakdown, revenueBreakdown } = calculateBreakdowns(stats);
  const periodLabel = getPeriodLabel(dateRange);

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
        breakdown={revenueBreakdown}
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
        value={`${((stats.currentTotal / (stats.totalBudget || 1)) * 100).toFixed(1)}%`}
        icon={AlertCircle}
        trend={{
          value: `${Math.abs(100 - ((stats.currentTotal / (stats.totalBudget || 1)) * 100)).toFixed(1)}%`,
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
