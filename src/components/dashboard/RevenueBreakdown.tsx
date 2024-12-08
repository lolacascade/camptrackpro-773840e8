import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

export function RevenueBreakdown() {
  const currentDate = new Date();
  
  // Generate 24 months of data (12 before, current, 11 after)
  const generateMonthlyData = () => {
    const data = [];
    for (let i = -12; i <= 11; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      data.push({
        date: date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        slipRenewals: Math.random() * 8000 + 2000,
        newSlipRentals: Math.random() * 8000 + 2000,
        maintenanceServices: Math.random() * 3000 + 1000,
      });
    }
    return data;
  };

  const data = generateMonthlyData();
  const currentMonth = format(currentDate, 'MMM');

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Revenue Breakdown</CardTitle>
        <div className="flex items-center gap-4">
          <button className="text-[#133134] text-base">&lt;</button>
          <span className="text-[#133134] text-base font-medium">
            {format(currentDate, 'MMM yyyy')}
          </span>
          <button className="text-[#133134] text-base">&gt;</button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0D1D1F]"></div>
              <span className="text-[#133134] text-base">Slip Renewals</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                ${(7221.31).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#BFC6B3] text-base">↓ 5% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C0CCAB]"></div>
              <span className="text-[#133134] text-base">New Slip Rentals</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                ${(8874.56).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#BFC6B3] text-base">↑ 10% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0D1D1F]/60"></div>
              <span className="text-[#133134] text-base">Maintenance Services</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                ${(3472.19).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#BFC6B3] text-base">Stable month-over-month</div>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
                tick={{ fontSize: 16, fill: '#0D1D1F' }}
                tickFormatter={(value, index) => {
                  const item = data[index];
                  return `${item.month}\n${item.year}`;
                }}
              />
              <YAxis 
                tick={{ fontSize: 16, fill: '#0D1D1F' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#FFF] p-4 rounded-lg shadow-lg border border-[#BFC6B3]/20 text-base">
                        <p className="font-bold text-[#0D1D1F]">{`${label} ${payload[0]?.payload.year}`}</p>
                        <p className="text-[#0D1D1F]">
                          <span className="inline-block w-3 h-3 rounded-full bg-[#0D1D1F] mr-2"></span>
                          {`Slip Renewals: $${payload[0]?.value.toLocaleString()}`}
                        </p>
                        <p className="text-[#0D1D1F]">
                          <span className="inline-block w-3 h-3 rounded-full bg-[#C0CCAB] mr-2"></span>
                          {`New Rentals: $${payload[1]?.value.toLocaleString()}`}
                        </p>
                        <p className="text-[#0D1D1F]">
                          <span className="inline-block w-3 h-3 rounded-full bg-[#0D1D1F]/60 mr-2"></span>
                          {`Maintenance: $${payload[2]?.value.toLocaleString()}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="slipRenewals" stackId="a" fill="#0D1D1F" />
              <Bar dataKey="newSlipRentals" stackId="a" fill="#C0CCAB" />
              <Bar dataKey="maintenanceServices" stackId="a" fill="#0D1D1F60" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}