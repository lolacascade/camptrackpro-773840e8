import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MarinaChart } from "@/components/dashboard/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [dateRange, setDateRange] = useState(12); // Default to 12 months
  const currentDate = new Date();
  
  const generateMonthlyData = () => {
    const data: DockStats[] = [];
    // Generate historical data
    for (let i = -dateRange; i <= 2; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      const isProjected = i > 0;
      
      // Base values
      let occupied = Math.floor(Math.random() * 30) + 20;
      let available = Math.floor(Math.random() * 20) + 10;
      let maintenance = Math.floor(Math.random() * 10) + 5;
      
      // Apply growth rate to projected months
      if (isProjected) {
        const growthRate = 1.05; // 5% growth
        occupied = Math.floor(occupied * growthRate);
        available = Math.floor(available * growthRate);
        maintenance = Math.floor(maintenance * growthRate);
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

  const handleDateRangeChange = (newRange: number) => {
    setDateRange(newRange);
  };

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Marina Overview</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateRangeChange(6)}
              className={dateRange === 6 ? 'bg-primary text-primary-foreground' : ''}
            >
              6M
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateRangeChange(12)}
              className={dateRange === 12 ? 'bg-primary text-primary-foreground' : ''}
            >
              12M
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-[#133134] text-base font-medium">
              {format(currentDate, 'MMM yyyy')}
            </span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1976D2]"></div>
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
              <div className="w-3 h-3 rounded-full bg-[#F57C00]"></div>
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
              <div className="w-3 h-3 rounded-full bg-[#7B1FA2]"></div>
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