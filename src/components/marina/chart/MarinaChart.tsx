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
import { ChartSummary } from "./ChartSummary";
import { ChartTooltip } from "./ChartTooltip";
import { PerformanceNotes } from "./PerformanceNotes";
import { calculateTrends } from "@/components/dashboard/utils/chartUtils";
import { MarinaChartProps } from "./types";

const COLORS = {
  occupied: "#0EA5E9",  // Ocean Blue for occupied
  available: "#33C3F0", // Sky Blue for available
  maintenance: "#ea384c", // Red for maintenance
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
            className="drop-shadow-lg"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
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
              tickFormatter={(value) => `${value} slips`}
              label={{ 
                value: 'Number of Slips', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={(props) => <ChartTooltip {...props} trends={trends} />} />
            <Legend 
              formatter={(value) => {
                const labels = {
                  occupied: 'Occupied',
                  available: 'Available',
                  maintenance: 'In Maintenance'
                };
                return labels[value as keyof typeof labels];
              }}
            />
            <Bar 
              dataKey="occupied" 
              stackId="a"
              fill={COLORS.occupied}
              fillOpacity="occupiedOpacity"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="available" 
              stackId="a"
              fill={COLORS.available}
              fillOpacity="availableOpacity"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="maintenance" 
              stackId="a"
              fill={COLORS.maintenance}
              fillOpacity="maintenanceOpacity"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <PerformanceNotes notes={performanceNotes} />
    </div>
  );
}