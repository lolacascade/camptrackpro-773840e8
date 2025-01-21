export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  notes?: string;
  status?: string;
  payment_method?: string;
  receipt_url?: string;
}

export interface ExpenseCategory {
  id: number;
  name: string;
  description?: string;
  budget_allocation?: number;
}

export interface MonthlyBudget {
  id: number;
  month: string;
  amount: number;
}

export type ExpenseType = 
  | "Maintenance"
  | "Utilities"
  | "Supplies"
  | "Administrative Costs"
  | "Taxes"
  | "Capital Expenditures"
  | "Other";

export type ExpenseStatus = "completed" | "pending" | "cancelled";

export interface ExpenseFilter {
  type?: ExpenseType;
  status?: ExpenseStatus;
  startDate?: Date;
  endDate?: Date;
}