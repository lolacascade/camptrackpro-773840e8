import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format, subMonths, addMonths } from "date-fns";

interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
}

interface MarinaChartProps {
  chartData: DockStats[];
}

export function MarinaChart({ chartData }: MarinaChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
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
            tick={{ fontSize: 16, fill: '#133134' }}
            tickFormatter={(value, index) => {
              const item = chartData[index];
              return `${item.month}\n${item.year}`;
            }}
          />
          <YAxis 
            tick={{ fontSize: 16, fill: '#133134' }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border text-base">
                    <p className="font-bold text-[#133134]">{`${label} ${payload[0]?.payload.year}`}</p>
                    <p className="text-[#133134]">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#FF1493] mr-2"></span>
                      {`Occupied: ${payload[0]?.value}`}
                    </p>
                    <p className="text-[#133134]">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#32CD32] mr-2"></span>
                      {`Available: ${payload[1]?.value}`}
                    </p>
                    <p className="text-[#133134]">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#FFA500] mr-2"></span>
                      {`Maintenance: ${payload[2]?.value}`}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="occupied" stackId="a" fill="#FF1493" />
          <Bar dataKey="available" stackId="a" fill="#32CD32" />
          <Bar dataKey="maintenance" stackId="a" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}