import { PieProps } from "recharts";

export interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ExpenseData;
  }>;
}

export interface ExpenseLegendItemProps {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DonutChartProps {
  data: ExpenseData[];
  chartSize: number;
  outerRadius: number;
  innerRadius: number;
  colors: string[];
}