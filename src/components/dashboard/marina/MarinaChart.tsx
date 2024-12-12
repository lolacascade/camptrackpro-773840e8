import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { ChartSummary } from "./ChartSummary";
import { ChartTooltip } from "./ChartTooltip";
import { PerformanceNotes } from "./PerformanceNotes";
import { calculateTrends } from "../utils/chartUtils";
import { MarinaChartProps } from "./types";

const COLORS = {
  available: "#F57C00",
  occupied: "#1976D2",
  maintenance: "#7B1FA2",
};

export function MarinaChart({ chartData }: MarinaChartProps) {
  const averageRevenue = chartData.reduce((acc, curr) => 
    acc + (curr.occupied + curr.available + curr.maintenance), 0) / chartData.length;

  const { trends, performanceNotes } = calculateTrends(chartData);

  const transformedData = chartData.map(item => ({
    ...item,
    occupiedOpacity: item.isProjected ? 0.6 : 1,
    availableOpacity: item.isProjected ? 0.6 : 1,
    maintenanceOpacity: item.isProjected ? 0.6 : 1,
  }));

  return (
    <div className="space-y-4">
      <ChartSummary averageRevenue={averageRevenue} chartData={chartData} />
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12, fill: '#133134' }}
              tickFormatter={(value, index) => {
                const item = chartData[index];
                return `${item.month}\n${item.year}${item.isProjected ? '*' : ''}`;
              }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#133134' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              label={{ 
                value: 'Monthly Revenue ($)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={(props) => <ChartTooltip {...props} trends={trends} />} />
            <Legend 
              formatter={(value) => {
                const labels = {
                  occupied: 'Occupied Spots',
                  available: 'Available Spots',
                  maintenance: 'In Maintenance'
                };
                return labels[value as keyof typeof labels];
              }}
            />
            <ReferenceLine 
              y={averageRevenue} 
              label="Average Revenue" 
              stroke="#666"
              strokeDasharray="3 3"
            />
            <Bar 
              dataKey="occupied" 
              fill={COLORS.occupied}
              fillOpacity="occupiedOpacity"
            />
            <Bar 
              dataKey="available" 
              fill={COLORS.available}
              fillOpacity="availableOpacity"
            />
            <Bar 
              dataKey="maintenance" 
              fill={COLORS.maintenance}
              fillOpacity="maintenanceOpacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <PerformanceNotes notes={performanceNotes} />
    </div>
  );
}