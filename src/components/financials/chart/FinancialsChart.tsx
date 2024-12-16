import { Card } from "@/components/ui/card";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ChartDataItem } from "../types";
import { format } from "date-fns";

interface FinancialsChartProps {
  chartData: ChartDataItem[];
}

export function FinancialsChart({ chartData }: FinancialsChartProps) {
  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => format(new Date(`${value}-01`), 'MMM yyyy')}
              tick={{ fontSize: 12, fill: '#133134' }}
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12, fill: '#133134' }}
              label={{ 
                value: 'Monthly Revenue ($)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => format(new Date(`${label}-01`), 'MMMM yyyy')}
            />
            <Legend 
              formatter={(value) => {
                const labels = {
                  Maintenance: 'In Maintenance',
                  Utilities: 'Available Spots',
                  Supplies: 'Occupied Spots'
                };
                return labels[value as keyof typeof labels];
              }}
            />
            <Bar
              dataKey="Supplies"
              name="Occupied Spots"
              fill="#0EA5E9"
              stackId="1"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Utilities"
              name="Available Spots"
              fill="#F97316"
              stackId="1"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Maintenance"
              name="In Maintenance"
              fill="#8B5CF6"
              stackId="1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}