import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { useIsMobile } from "@/hooks/use-mobile";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border">
        <p className="font-medium">{data.category}</p>
        <p className="text-gray-600">${data.amount.toLocaleString()}</p>
        <p className="text-gray-500">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

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

      // Group and sum expenses by category
      const groupedData = data.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
      }, {});

      // Calculate total expenses
      const total = Object.values(groupedData).reduce((sum, amount) => sum + amount, 0);

      // Format data for the chart
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
          <div className="w-full md:w-1/2 flex items-center justify-center" style={{ height: `${chartSize}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  activeShape={(props) => {
                    const RADIAN = Math.PI / 180;
                    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
                    const sin = Math.sin(-RADIAN * midAngle);
                    const cos = Math.cos(-RADIAN * midAngle);
                    const mx = cx + (outerRadius + 30) * cos;
                    const my = cy + (outerRadius + 30) * sin;
                    return (
                      <g>
                        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#133134">
                          {payload.category}
                        </text>
                        <text x={mx} y={my} textAnchor={cos >= 0 ? 'start' : 'end'} fill="#133134">
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      </g>
                    );
                  }}
                >
                  {expenseData?.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full md:w-1/2 space-y-4">
            {expenseData?.map((entry, index) => (
              <div key={entry.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{entry.category}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">${entry.amount.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{entry.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}