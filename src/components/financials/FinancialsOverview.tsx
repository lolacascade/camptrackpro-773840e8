import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, addMonths } from "date-fns";

export function FinancialsOverview() {
  const { data: chartData = [] } = useQuery({
    queryKey: ['expense-trends'],
    queryFn: async () => {
      const currentDate = new Date();
      const startDate = subMonths(currentDate, 6);
      const endDate = currentDate;

      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount, category, date')
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .order('date');

      // Process and aggregate data by month
      const monthlyData: Record<string, Record<string, number>> = {};
      
      expenses?.forEach(expense => {
        const monthKey = format(new Date(expense.date), 'MMM yyyy');
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {};
        }
        monthlyData[monthKey][expense.category] = (monthlyData[monthKey][expense.category] || 0) + Number(expense.amount);
      });

      // Generate data for the past 6 months, current month, and 5 future months
      const allData = [];
      for (let i = -6; i <= 5; i++) {
        const date = i <= 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i);
        const monthKey = format(date, 'MMM yyyy');
        
        const monthData = {
          month: monthKey,
          Maintenance: monthlyData[monthKey]?.Maintenance || 0,
          Utilities: monthlyData[monthKey]?.Utilities || 0,
          Supplies: monthlyData[monthKey]?.Supplies || 0,
          Other: monthlyData[monthKey]?.Other || 0,
          isProjected: i > 0
        };

        // For projected months, estimate based on average
        if (i > 0) {
          const avgGrowth = 1.05; // 5% projected growth
          Object.keys(monthData).forEach(key => {
            if (key !== 'month' && key !== 'isProjected') {
              monthData[key as keyof typeof monthData] = 
                typeof monthData[key as keyof typeof monthData] === 'number'
                  ? (monthData[key as keyof typeof monthData] as number) * avgGrowth
                  : 0;
            }
          });
        }

        allData.push(monthData);
      }

      return allData;
    }
  });

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Expense Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
                tick={{ fontSize: 12, fill: '#133134' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#133134' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelStyle={{ color: '#133134' }}
              />
              <Legend />
              <Bar dataKey="Maintenance" fill="#FF1493" />
              <Bar dataKey="Utilities" fill="#32CD32" />
              <Bar dataKey="Supplies" fill="#FFA500" />
              <Bar dataKey="Other" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}