import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaChart } from "./MarinaChart";
import { format, subMonths, addMonths } from "date-fns";

interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
}

export function MarinaOverview() {
  const currentDate = new Date();
  
  // Generate 24 months of data (12 before, current, 11 after)
  const generateMonthlyData = () => {
    const data: DockStats[] = [];
    for (let i = -12; i <= 11; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      data.push({
        date: date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        occupied: Math.floor(Math.random() * 30) + 20, // Random data between 20-50
        available: Math.floor(Math.random() * 20) + 10, // Random data between 10-30
        maintenance: Math.floor(Math.random() * 10) + 5, // Random data between 5-15
      });
    }
    return data;
  };

  const chartData = generateMonthlyData();
  const currentMonthStats = chartData.find(data => 
    format(data.date, 'MMM yyyy') === format(currentDate, 'MMM yyyy')
  );

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Marina Overview</CardTitle>
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
              <div className="w-3 h-3 rounded-full bg-[#FF1493]"></div>
              <span className="text-[#133134] text-base">Occupied Slips</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.occupied || 0}
              </div>
              <div className="text-[#3E4238] text-base">↑ 8% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#32CD32]"></div>
              <span className="text-[#133134] text-base">Available Slips</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.available || 0}
              </div>
              <div className="text-[#3E4238] text-base">↓ 3% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>
              <span className="text-[#133134] text-base">In Maintenance</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.maintenance || 0}
              </div>
              <div className="text-[#3E4238] text-base">Stable month-over-month</div>
            </div>
          </div>
        </div>

        <MarinaChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}