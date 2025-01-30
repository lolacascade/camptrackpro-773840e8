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
import { differenceInDays } from "date-fns";
import { ChartTooltip } from "./ChartTooltip";
import { useRevenueData } from "./useRevenueData";
import { RevenueChartProps } from "./types";

export function RevenueChart({ dateRange }: RevenueChartProps) {
  const { data: financialData } = useRevenueData(dateRange);
  const daysDifference = differenceInDays(dateRange.to, dateRange.from);
  const showDailyData = daysDifference <= 31;

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
                tickFormatter={(value) => value}
                interval={0}
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
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="income" name="Income" fill="#10B981" stackId="a" />
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}