import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarinaChart } from "./chart/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useState } from "react";

interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
  isProjected?: boolean;
}

export function MarinaOverview() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate monthly data
  const generateMonthlyData = () => {
    const data: DockStats[] = [];
    for (let i = -12; i <= 2; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      const isProjected = i > 0;
      
      // Sample data matching the graph pattern
      let occupied = Math.floor(Math.random() * 15) + 30; // Random between 30-45
      let available = Math.floor(Math.random() * 10) + 15; // Random between 15-25
      let maintenance = Math.floor(Math.random() * 8) + 5;  // Random between 5-13
      
      if (isProjected) {
        occupied = Math.floor(occupied * 0.95);  // Slight decrease for projected months
        available = Math.floor(available * 1.05); // Slight increase
        maintenance = Math.floor(maintenance * 0.9); // Slight decrease
      }
      
      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        occupied,
        available,
        maintenance,
        isProjected
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
          <div className="flex gap-2 mr-4">
            <button className="px-3 py-1 rounded-md bg-white">6M</button>
            <button className="px-3 py-1 rounded-md bg-[#C0CCAB]">12M</button>
          </div>
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
              <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
              <span className="text-[#133134] text-base">Occupied Slips</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.occupied || 40}
              </div>
              <div className="text-[#3E4238] text-base">↑ 8% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
              <span className="text-[#133134] text-base">Available Slips</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.available || 23}
              </div>
              <div className="text-[#3E4238] text-base">↓ 3% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
              <span className="text-[#133134] text-base">In Maintenance</span>
            </div>
            <div className="mt-2">
              <div className="text-[#133134] text-2xl font-bold">
                {currentMonthStats?.maintenance || 11}
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