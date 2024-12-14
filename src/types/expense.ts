export interface Expense {
  id: number;
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