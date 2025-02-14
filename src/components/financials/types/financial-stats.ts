
export interface FinancialStats {
  currentTotal: number;
  previousTotal: number;
  currentRevenue: number;
  previousRevenue: number;
  totalBudget: number;
  categoryTotals: Record<string, number>;
  revenueByType: Record<string, number>;
  largestExpense: {
    amount: number;
    category: string;
  };
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface StatBreakdown {
  label: string;
  value: string;
  percentage?: number;
}
