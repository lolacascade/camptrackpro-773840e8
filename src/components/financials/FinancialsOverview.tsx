import { useState } from "react";
import { ExpenseTable } from "./ExpenseTable";
import { FinancialsStatsCards } from "./FinancialsStatsCards";
import { AddExpenseDrawer } from "./AddExpenseDrawer";
import { useExpenseData } from "./hooks/useExpenseData";
import { RevenueChart } from "./RevenueChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import type { Expense } from "@/types/expense";

export function FinancialsOverview() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { expenses, isLoading, refetch } = useExpenseData();

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
      <FinancialsStatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <ExpenseBreakdownChart />
      </div>
      
      <ExpenseTable
        onEdit={handleEditExpense}
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