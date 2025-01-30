import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { useOrganization } from "@/hooks/use-organization";

interface MonthlyFinancials {
  month: string;
  year: string;
  income: number;
  expenses: number;
  netProfit: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  const income = payload[0]?.value || 0;
  const expenses = payload[1]?.value || 0;
  const netProfit = income - expenses;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        <p className="text-emerald-600 flex justify-between gap-4">
          <span>Income:</span>
          <span>${income.toLocaleString()}</span>
        </p>
        <p className="text-red-600 flex justify-between gap-4">
          <span>Expenses:</span>
          <span>${expenses.toLocaleString()}</span>
        </p>
        <div className="border-t border-gray-200 mt-2 pt-2">
          <p className={`flex justify-between gap-4 font-medium ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            <span>Net Profit:</span>
            <span>${netProfit.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export function RevenueChart() {
  const { organizationId, accountId } = useOrganization();
  const monthsToShow = 12;

  const { data: financialData } = useQuery({
    queryKey: ['financial-data', organizationId, accountId],
    queryFn: async () => {
      const endDate = endOfMonth(new Date());
      const startDate = startOfMonth(subMonths(new Date(), monthsToShow - 1));

      // Fetch income (invoices)
      const { data: incomeData, error: incomeError } = await supabase
        .from('invoices')
        .select('amount, created_at')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .eq('status', 'paid');

      if (incomeError) {
        console.error('Error fetching income:', incomeError);
        return [];
      }

      // Fetch expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('amount, date')
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (expensesError) {
        console.error('Error fetching expenses:', expensesError);
        return [];
      }

      // Process and aggregate data by month
      const monthlyData: { [key: string]: MonthlyFinancials } = {};

      // Initialize months
      for (let i = 0; i < monthsToShow; i++) {
        const date = subMonths(new Date(), i);
        const key = format(date, 'yyyy-MM');
        monthlyData[key] = {
          month: format(date, 'MMM'),
          year: format(date, 'yyyy'),
          income: 0,
          expenses: 0,
          netProfit: 0,
        };
      }

      // Aggregate income
      incomeData?.forEach((invoice) => {
        const date = new Date(invoice.created_at);
        const key = format(date, 'yyyy-MM');
        if (monthlyData[key]) {
          monthlyData[key].income += Number(invoice.amount);
        }
      });

      // Aggregate expenses
      expensesData?.forEach((expense) => {
        const date = new Date(expense.date);
        const key = format(date, 'yyyy-MM');
        if (monthlyData[key]) {
          monthlyData[key].expenses += Number(expense.amount);
        }
      });

      // Calculate net profit and convert to array
      return Object.values(monthlyData)
        .map(data => ({
          ...data,
          netProfit: data.income - data.expenses
        }))
        .reverse();
    },
    enabled: !!organizationId && !!accountId,
  });

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={financialData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#133134' }}
                tickFormatter={(value, index) => {
                  const item = financialData?.[index];
                  return `${item?.month} ${item?.year}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#133134' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                label={{
                  value: 'Amount ($)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="income" name="Income" fill="#10B981" stackId="a" />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}