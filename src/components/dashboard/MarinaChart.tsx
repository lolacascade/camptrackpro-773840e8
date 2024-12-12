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
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateTrends } from "./utils/chartUtils";

interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
  isProjected?: boolean;
}

interface MarinaChartProps {
  chartData: DockStats[];
}

const COLORS = {
  available: "#F57C00",
  occupied: "#1976D2",
  maintenance: "#7B1FA2",
  positive: "#388E3C",
  negative: "#D32F2F",
};

export function MarinaChart({ chartData }: MarinaChartProps) {
  const averageRevenue = chartData.reduce((acc, curr) => 
    acc + (curr.occupied + curr.available + curr.maintenance), 0) / chartData.length;

  const { trends, performanceNotes } = calculateTrends(chartData);

  // Transform the data to include opacity directly in the data points
  const transformedData = chartData.map(item => ({
    ...item,
    occupiedOpacity: item.isProjected ? 0.6 : 1,
    availableOpacity: item.isProjected ? 0.6 : 1,
    maintenanceOpacity: item.isProjected ? 0.6 : 1,
  }));

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Average Monthly Revenue</div>
            <div className="text-2xl font-bold">${averageRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Revenue (Period)</div>
            <div className="text-2xl font-bold">
              ${chartData.reduce((acc, curr) => 
                acc + (curr.occupied + curr.available + curr.maintenance), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Average Utilization</div>
            <div className="text-2xl font-bold">
              {Math.round(chartData.reduce((acc, curr) => 
                acc + (curr.occupied / (curr.occupied + curr.available + curr.maintenance)) * 100, 0
              ) / chartData.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  const trend = trends[`${item.month}-${item.year}`];
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border text-sm">
                      <p className="font-bold text-[#133134] mb-2">
                        {`${label} ${item.year}`}
                        {item.isProjected && " (Projected)"}
                      </p>
                      {payload.map((entry, index) => (
                        <p key={index} className="text-[#133134] flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full inline-block`} 
                            style={{ backgroundColor: entry.color }} />
                          {`${entry.name}: $${entry.value.toLocaleString()}`}
                        </p>
                      ))}
                      {trend && (
                        <p className={`mt-2 ${trend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trend.change >= 0 ? '↑' : '↓'} {Math.abs(trend.change)}% vs previous month
                        </p>
                      )}
                      {item.isProjected && (
                        <p className="mt-2 text-xs text-gray-500">
                          Based on 5% expected growth rate
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
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
            <ReferenceLine y={averageRevenue} 
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

      {/* Performance Notes */}
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium">Monthly Insights</h4>
        <div className="flex flex-wrap gap-2">
          {performanceNotes.map((note, index) => (
            <Badge 
              key={index}
              variant={note.type === 'positive' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {note.month}: {note.message}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}