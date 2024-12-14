export interface ExpenseData {
  Maintenance: number;
  Utilities: number;
  Supplies: number;
  Other: number;
}

export interface ChartDataItem extends ExpenseData {
  month: string;
  isProjected: boolean;
}