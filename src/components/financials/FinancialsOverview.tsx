import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddExpenseDrawer } from "./AddExpenseDrawer";
import { ExpenseTable } from "./ExpenseTable";
import { FinancialsStatsCards } from "./FinancialsStatsCards";
import { FinancialsChart } from "./chart/FinancialsChart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, addMonths } from "date-fns";
import { useSession } from '@supabase/auth-helpers-react';
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/types/expense";
import type { ChartDataItem, ExpenseData } from "./types";

const GROWTH_RATE = 1.05;
const MONTHS_BACK = 6;
const MONTHS_FORWARD = 5;
const EXPENSE_CATEGORIES = ['Maintenance', 'Utilities', 'Supplies', 'Other'] as const;

export function FinancialsOverview() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const session = useSession();
  const { toast } = useToast();

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['expenses', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        toast({
          title: "Error",
          description: "Failed to fetch expenses. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
    enabled: !!session?.user.id,
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["expenses-chart", session?.user.id],
    queryFn: async () => {
      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("amount, category, date")
        .eq('user_id', session?.user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error('Error fetching chart data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch chart data. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      if (!expenses) return [];

      const currentDate = new Date();
      
      // Group expenses by month and category
      const monthlyData = expenses.reduce<Record<string, ExpenseData>>((acc, expense) => {
        const monthKey = format(new Date(expense.date), 'MMM yyyy');
        if (!acc[monthKey]) {
          acc[monthKey] = {
            Maintenance: 0,
            Utilities: 0,
            Supplies: 0,
            Other: 0,
          };
        }
        
        const category = expense.category as keyof ExpenseData;
        if (EXPENSE_CATEGORIES.includes(category as any)) {
          acc[monthKey][category] += expense.amount;
        } else {
          acc[monthKey].Other += expense.amount;
        }
        
        return acc;
      }, {});

      // Generate timeline data
      const timelineData: ChartDataItem[] = [];
      
      // Past and current months
      for (let i = -MONTHS_BACK; i <= 0; i++) {
        const date = subMonths(currentDate, Math.abs(i));
        const monthKey = format(date, 'MMM yyyy');
        
        timelineData.push({
          month: monthKey,
          ...monthlyData[monthKey] || {
            Maintenance: 0,
            Utilities: 0,
            Supplies: 0,
            Other: 0,
          },
          isProjected: false,
        });
      }
      
      // Future months (projected)
      let lastMonth = timelineData[timelineData.length - 1];
      for (let i = 1; i <= MONTHS_FORWARD; i++) {
        const date = addMonths(currentDate, i);
        const projectedData: ChartDataItem = {
          month: format(date, 'MMM yyyy'),
          Maintenance: lastMonth.Maintenance * GROWTH_RATE,
          Utilities: lastMonth.Utilities * GROWTH_RATE,
          Supplies: lastMonth.Supplies * GROWTH_RATE,
          Other: lastMonth.Other * GROWTH_RATE,
          isProjected: true,
        };
        timelineData.push(projectedData);
        lastMonth = projectedData;
      }

      return timelineData;
    },
    enabled: !!session?.user.id,
  });

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#133134]">Financial Overview</h1>
        <Button 
          onClick={handleAdd}
          className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <FinancialsStatsCards />
      <FinancialsChart chartData={chartData} />

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
  );
}