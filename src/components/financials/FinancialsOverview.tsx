import { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useToast } from "@/hooks/use-toast";
import { AddExpenseDrawer } from "./AddExpenseDrawer";
import { ExpenseTable } from "./ExpenseTable";
import { FinancialsStatsCards } from "./FinancialsStatsCards";
import { FinancialsChart } from "./chart/FinancialsChart";
import { FinancialsHeader } from "./components/FinancialsHeader";
import { useExpenseData } from "./hooks/useExpenseData";
import { useChartData } from "./hooks/useChartData";
import type { Expense } from "@/types/expense";

export function FinancialsOverview() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const session = useSession();
  const { toast } = useToast();
  const { data: expenses = [], isLoading, refetch } = useExpenseData();
  const { data: chartData = [] } = useChartData();

  const handleEdit = async (expense: Expense) => {
    if (!session?.user.id) {
      toast({
        title: "Error",
        description: "You must be logged in to edit expenses.",
        variant: "destructive",
      });
      return;
    }
    setSelectedExpense(expense);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    if (!session?.user.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add expenses.",
        variant: "destructive",
      });
      return;
    }
    setSelectedExpense(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <FinancialsHeader onAdd={handleAdd} />
      <FinancialsStatsCards />
      <FinancialsChart chartData={chartData} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#133134]"></div>
        </div>
      ) : (
        <ExpenseTable onEdit={handleEdit} />
      )}

      <AddExpenseDrawer
        expense={selectedExpense}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedExpense(null);
        }}
        onExpenseUpdated={refetch}
      />
    </div>
  );
}