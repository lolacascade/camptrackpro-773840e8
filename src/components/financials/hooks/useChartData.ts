import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { format, subMonths, addMonths } from "date-fns";
import type { ChartDataItem, ExpenseData } from "../types";

const GROWTH_RATE = 1.05;
const MONTHS_BACK = 6;
const MONTHS_FORWARD = 5;
const EXPENSE_CATEGORIES = ['Maintenance', 'Utilities', 'Supplies', 'Other'] as const;

export function useChartData() {
  const session = useSession();
  const { toast } = useToast();

  return useQuery({
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
        const monthKey = format(new Date(expense.date), 'yyyy-MM');
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
        const monthKey = format(date, 'yyyy-MM');
        
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
          month: format(date, 'yyyy-MM'),
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
}