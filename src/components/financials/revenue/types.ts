import { TooltipProps } from 'recharts';

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

export interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}