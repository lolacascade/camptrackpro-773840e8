import { Card } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="maintenance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="utilities" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="supplies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="other" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => format(new Date(`${value}-01`), 'MMM yyyy')}
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => format(new Date(`${label}-01`), 'MMMM yyyy')}
            />
            <Area
              type="monotone"
              dataKey="Maintenance"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#maintenance)"
            />
            <Area
              type="monotone"
              dataKey="Utilities"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#utilities)"
            />
            <Area
              type="monotone"
              dataKey="Supplies"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#supplies)"
            />
            <Area
              type="monotone"
              dataKey="Other"
              stroke="#ff7300"
              fillOpacity={1}
              fill="url(#other)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}