import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FinancialsStatsCards } from "@/components/financials/FinancialsStatsCards";
import { FinancialsOverview } from "@/components/financials/FinancialsOverview";
import { ExpenseTable } from "@/components/financials/ExpenseTable";
import { AddExpenseDrawer } from "@/components/financials/AddExpenseDrawer";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Expense } from "@/types/expense";

export default function Financials() {
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        toast({
          title: "Error",
          description: "Failed to load expenses.",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
  });

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setSelectedExpense(null);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Financials</h1>
            <Button 
              onClick={handleAdd}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </div>

          <FinancialsStatsCards />
          <FinancialsOverview />

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#133134]"></div>
            </div>
          ) : (
            <ExpenseTable
              expenses={expenses}
              onEdit={handleEdit}
            />
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
      </PageContainer>
    </PageWithChat>
  );
}