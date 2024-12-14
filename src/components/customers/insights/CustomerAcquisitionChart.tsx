import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { format } from "date-fns";

interface ChartData {
  date: Date;
  month: string;
  year: string;
  newCustomers: number;
  existingCustomers: number;
  isProjected?: boolean;
}

interface CustomerAcquisitionChartProps {
  chartData: ChartData[];
  currentMonthData?: ChartData;
}

export function CustomerAcquisitionChart({ chartData, currentMonthData }: CustomerAcquisitionChartProps) {
  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Customer Growth Trends</CardTitle>
        <div className="flex items-center gap-4">
          <button className="text-[#133134] text-base">&lt;</button>
          <span className="text-[#133134] text-base font-medium">
            {format(new Date(), 'MMM yyyy')}
          </span>
          <button className="text-[#133134] text-base">&gt;</button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-[#133134] text-base">New Customers</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthData?.newCustomers || 0}
              </div>
              <div className="text-[#3E4238] text-base">
                This month's acquisitions
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
              <span className="text-[#133134] text-base">Existing Customers</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthData?.existingCustomers || 0}
              </div>
              <div className="text-[#3E4238] text-base">
                Total retained customers
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-2">
                          {`${label} ${item.year}`}
                          {item.isProjected && " (Projected)"}
                        </p>
                        {payload.map((entry: any) => (
                          <div 
                            key={entry.name}
                            className="flex items-center justify-between gap-4 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="capitalize">
                                {entry.name === 'newCustomers' ? 'New Customers' : 'Existing Customers'}: {entry.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="newCustomers" 
                name="New Customers"
                fill="#0EA5E9"
                radius={[4, 4, 0, 0]}
                stackId="a"
              />
              <Bar 
                dataKey="existingCustomers" 
                name="Existing Customers"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}