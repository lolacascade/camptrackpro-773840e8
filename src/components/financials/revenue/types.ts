
export interface MonthlyFinancials {
  month: string;
  year: string;
  income: number;
  expenses: number;
  netProfit: number;
}

export interface RevenueChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}
