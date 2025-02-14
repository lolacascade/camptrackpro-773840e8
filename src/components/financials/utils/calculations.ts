
import { format, isWithinInterval } from "date-fns";
import type { FinancialStats, DateRange, StatBreakdown } from "../types/financial-stats";

export function calculateBreakdowns(stats: FinancialStats): {
  categoryBreakdown: StatBreakdown[];
  revenueBreakdown: StatBreakdown[];
} {
  const categoryBreakdown = Object.entries(stats.categoryTotals).map(([category, amount]) => ({
    label: category,
    value: `$${amount.toLocaleString()}`,
    percentage: Math.round((amount / (stats.currentTotal || 1)) * 100)
  }));

  const revenueBreakdown = Object.entries(stats.revenueByType).map(([type, amount]) => ({
    label: type,
    value: `$${amount.toLocaleString()}`,
    percentage: Math.round((amount / (stats.currentRevenue || 1)) * 100)
  }));

  return { categoryBreakdown, revenueBreakdown };
}

export function calculateChanges(stats: FinancialStats): {
  revenueChange: number;
  expenseChange: number;
} {
  const revenueChange = stats.previousRevenue 
    ? ((stats.currentRevenue - stats.previousRevenue) / stats.previousRevenue) * 100 
    : 0;

  const expenseChange = stats.previousTotal 
    ? ((stats.currentTotal - stats.previousTotal) / stats.previousTotal) * 100 
    : 0;

  return { revenueChange, expenseChange };
}

export function getPeriodLabel(dateRange: DateRange): string {
  return isWithinInterval(new Date(), { start: dateRange.from, end: dateRange.to })
    ? 'current period'
    : format(dateRange.from, 'MMM dd') + ' - ' + format(dateRange.to, 'MMM dd');
}
