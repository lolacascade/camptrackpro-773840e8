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

interface SlipStatsProps {
  totalSlips: number;
  availableSlips: number;
  occupiedSlips: number;
  maintenanceSlips: number;
}

interface MonthlyStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
}

export function SlipStats({
  totalSlips,
  availableSlips,
  occupiedSlips,
  maintenanceSlips,
}: SlipStatsProps) {
  const currentDate = new Date();
  
  // Generate 12 months of data (11 before, current)
  const generateMonthlyData = () => {
    const data: MonthlyStats[] = [];
    for (let i = -11; i <= 0; i++) {
      const date = i === 0 ? currentDate : subMonths(currentDate, Math.abs(i));
      // Generate some random variations around the current values for historical data
      const variation = Math.random() * 0.3 - 0.15; // -15% to +15%
      data.push({
        date: date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        occupied: Math.max(1, Math.round(occupiedSlips * (1 + variation))),
        available: Math.max(1, Math.round(availableSlips * (1 + variation))),
        maintenance: Math.max(1, Math.round(maintenanceSlips * (1 + variation))),
      });
    }
    return data;
  };

  const chartData = generateMonthlyData();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border border-[#E8EBEB] bg-transparent">
          <CardContent className="p-6">
            <div className="text-[#133134] font-medium">Total Slips</div>
            <div className="text-2xl font-bold text-[#133134]">{totalSlips}</div>
          </CardContent>
        </Card>
        <Card className="border border-[#E8EBEB] bg-transparent">
          <CardContent className="p-6">
            <div className="text-[#133134] font-medium">Available</div>
            <div className="text-2xl font-bold text-[#133134]">{availableSlips}</div>
          </CardContent>
        </Card>
        <Card className="border border-[#E8EBEB] bg-transparent">
          <CardContent className="p-6">
            <div className="text-[#133134] font-medium">Occupied</div>
            <div className="text-2xl font-bold text-[#133134]">{occupiedSlips}</div>
          </CardContent>
        </Card>
        <Card className="border border-[#E8EBEB] bg-transparent">
          <CardContent className="p-6">
            <div className="text-[#133134] font-medium">In Maintenance</div>
            <div className="text-2xl font-bold text-[#133134]">{maintenanceSlips}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-[#E8EBEB] bg-transparent">
        <CardContent className="p-6">
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
                <CartesianGrid strokeDasharray="3 3" stroke="#BFC6B3/20" />
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
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#BFC6B3]/20 text-base">
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
        </CardContent>
      </Card>
    </div>
  );
}