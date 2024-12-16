import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { format, subMonths, addMonths } from "date-fns";
import type { ChartDataItem, ExpenseData } from "../types";

const GROWTH_RATE = 1.05;
const MONTHS_BACK = 6;
const MONTHS_FORWARD = 5;
const EXPENSE_CATEGORIES = ['Maintenance', 'Utilities', 'Supplies'] as const;

const generateRandomAmount = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

      const currentDate = new Date();
      const timelineData: ChartDataItem[] = [];
      
      // Past and current months
      for (let i = -MONTHS_BACK; i <= 0; i++) {
        const date = subMonths(currentDate, Math.abs(i));
        timelineData.push({
          month: format(date, 'yyyy-MM'),
          Maintenance: generateRandomAmount(5, 15),
          Utilities: generateRandomAmount(10, 25),
          Supplies: generateRandomAmount(20, 45),
          isProjected: false,
        });
      }
      
      // Future months (projected)
      let lastMonth = timelineData[timelineData.length - 1];
      for (let i = 1; i <= MONTHS_FORWARD; i++) {
        const date = addMonths(currentDate, i);
        const projectedData: ChartDataItem = {
          month: format(date, 'yyyy-MM'),
          Maintenance: Math.round(lastMonth.Maintenance * GROWTH_RATE),
          Utilities: Math.round(lastMonth.Utilities * GROWTH_RATE),
          Supplies: Math.round(lastMonth.Supplies * GROWTH_RATE),
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