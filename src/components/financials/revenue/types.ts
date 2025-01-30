import { ReactNode } from 'react';

export interface MonthlyFinancials {
  month: string;
  year: string;
  income: number;
  expenses: number;
  netProfit: number;
  date: Date;
}

export interface RevenueChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface ChartDataProcessorProps {
  incomeData: any[];
  expensesData: any[];
  dateRange: {
    from: Date;
    to: Date;
  };
  showDailyData: boolean;
}