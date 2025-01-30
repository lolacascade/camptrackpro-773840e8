import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { useIsMobile } from "@/hooks/use-mobile";
import { DonutChart } from "./DonutChart";
import { ExpenseLegendItem } from "./ExpenseLegendItem";
import { ExpenseData } from "./types";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export function ExpenseBreakdownChart() {
  const { organizationId, accountId } = useOrganization();
  const isMobile = useIsMobile();

  const { data: expenseData } = useQuery({
    queryKey: ['expense-breakdown', organizationId, accountId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('category, amount')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching expense data:', error);
        return [];
      }

      const groupedData = data.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
      }, {});

      const total = Object.values(groupedData).reduce((sum, amount) => sum + amount, 0);

      return Object.entries(groupedData).map(([category, amount]) => ({
        category,
        amount,
        percentage: Math.round((amount / total) * 100)
      }));
    },
    enabled: !!organizationId && !!accountId,
  });

  const chartSize = isMobile ? 200 : 300;
  const outerRadius = isMobile ? 100 : 150;
  const innerRadius = outerRadius * 0.7;

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <DonutChart 
            data={expenseData || []}
            chartSize={chartSize}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            colors={COLORS}
          />
          
          <div className="w-full md:w-1/2 space-y-4">
            {expenseData?.map((entry, index) => (
              <ExpenseLegendItem
                key={entry.category}
                category={entry.category}
                amount={entry.amount}
                percentage={entry.percentage}
                color={COLORS[index % COLORS.length]}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}