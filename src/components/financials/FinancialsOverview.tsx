import { useState } from "react";
import { ExpenseTable } from "./ExpenseTable";
import { FinancialsStatsCards } from "./FinancialsStatsCards";
import { AddExpenseDrawer } from "./AddExpenseDrawer";
import { useExpenseData } from "./hooks/useExpenseData";
import { RevenueChart } from "./RevenueChart";
import { ExpenseBreakdownChart } from "./expense-breakdown/ExpenseBreakdownChart";
import type { Expense } from "@/types/expense";

interface FinancialsOverviewProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function FinancialsOverview({ dateRange }: FinancialsOverviewProps) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { expenses, isLoading, refetch } = useExpenseData(dateRange);

  const handleEditExpense = async (expense: Expense) => {
    setSelectedExpense(expense);
    setIsAddExpenseOpen(true);
  };

  const handleDrawerClose = () => {
    setIsAddExpenseOpen(false);
    setSelectedExpense(null);
    refetch();
  };

  return (
    <div className="space-y-8">
      <FinancialsStatsCards dateRange={dateRange} />
      <RevenueChart dateRange={dateRange} />
      <ExpenseBreakdownChart dateRange={dateRange} />
      <ExpenseTable
        onEdit={handleEditExpense}
        dateRange={dateRange}
      />

      <AddExpenseDrawer
        open={isAddExpenseOpen}
        onClose={handleDrawerClose}
        expense={selectedExpense}
        onExpenseUpdated={refetch}
      />
    </div>
  );
}