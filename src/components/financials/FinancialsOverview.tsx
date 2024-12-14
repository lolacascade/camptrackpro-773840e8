import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddExpenseDrawer } from "./AddExpenseDrawer";
import { ExpenseTable } from "./ExpenseTable";
import { FinancialsStatsCards } from "./FinancialsStatsCards";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, addMonths } from "date-fns";

interface ExpenseData {
  Maintenance: number;
  Utilities: number;
  Supplies: number;
  Other: number;
}

interface ChartDataItem extends ExpenseData {
  month: string;
  isProjected: boolean;
}

interface MonthlyExpenseData {
  [key: string]: ExpenseData;
}

const GROWTH_RATE = 1.05; // 5% projected growth
const MONTHS_BACK = 6;
const MONTHS_FORWARD = 5;
const EXPENSE_CATEGORIES = ['Maintenance', 'Utilities', 'Supplies', 'Other'] as const;

export function FinancialsOverview() {
  const { data: chartData = [] } = useQuery({
    queryKey: ["expenses-chart"],
    queryFn: async () => {
      const { data: expenses } = await supabase
        .from("expenses")
        .select("amount, category, date")
        .order("date", { ascending: true });

      if (!expenses) return [];

      const currentDate = new Date();
      
      // Group expenses by month and category
      const monthlyData = expenses.reduce<MonthlyExpenseData>((acc, expense) => {
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

      // Generate data for past, current, and future months
      return generateTimelineData(currentDate, monthlyData);
    },
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Financial Overview</h2>
        <Button onClick={() => setIsDrawerOpen(true)}>Add Expense</Button>
      </div>

      <FinancialsStatsCards />

      <Card className="p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="maintenance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="utilities" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="supplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="other" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Maintenance"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#maintenance)"
              />
              <Area
                type="monotone"
                dataKey="Utilities"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#utilities)"
              />
              <Area
                type="monotone"
                dataKey="Supplies"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#supplies)"
              />
              <Area
                type="monotone"
                dataKey="Other"
                stroke="#ff7300"
                fillOpacity={1}
                fill="url(#other)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <ExpenseTable />
      
      <AddExpenseDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </div>
  );
}

function generateTimelineData(currentDate: Date, monthlyData: MonthlyExpenseData): ChartDataItem[] {
  const allData: ChartDataItem[] = [];
  
  for (let i = -MONTHS_BACK; i <= MONTHS_FORWARD; i++) {
    const date = i <= 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i);
    const monthKey = format(date, 'MMM yyyy');
    
    const monthData: ChartDataItem = {
      month: monthKey,
      Maintenance: monthlyData[monthKey]?.Maintenance || 0,
      Utilities: monthlyData[monthKey]?.Utilities || 0,
      Supplies: monthlyData[monthKey]?.Supplies || 0,
      Other: monthlyData[monthKey]?.Other || 0,
      isProjected: i > 0,
    };

    // Apply growth rate to projected months
    if (i > 0) {
      EXPENSE_CATEGORIES.forEach(category => {
        monthData[category] *= GROWTH_RATE;
      });
    }

    allData.push(monthData);
  }

  return allData;
}