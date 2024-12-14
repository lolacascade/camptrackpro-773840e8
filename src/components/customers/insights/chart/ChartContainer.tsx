import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "../types";
import { ChartTooltip } from "./ChartTooltip";

interface ChartContainerProps {
  chartData: ChartData[];
}

export function ChartContainer({ chartData }: ChartContainerProps) {
  const transformedData = chartData.map(item => ({
    ...item,
    occupiedOpacity: item.isProjected ? 0.6 : 1,
    availableOpacity: item.isProjected ? 0.6 : 1,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="month"
            tick={{ fontSize: 12, fill: '#133134' }}
            tickFormatter={(value, index) => {
              const item = chartData[index];
              return `${item.month} ${item.year}${item.isProjected ? '*' : ''}`;
            }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#133134' }}
            label={{ 
              value: 'Number of Customers', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip content={ChartTooltip} />
          <Legend />
          <Bar 
            dataKey="newCustomers" 
            name="New Customers"
            fill="#0EA5E9"
            stackId="a"
          />
          <Bar 
            dataKey="existingCustomers" 
            name="Existing Customers"
            fill="#8B5CF6"
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}