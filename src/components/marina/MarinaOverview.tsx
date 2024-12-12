import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarinaChart } from "@/components/dashboard/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useState } from "react";
import { DateRangeControls } from "./DateRangeControls";
import { MarinaStats } from "./MarinaStats";
import { DockStats } from "./types";

export function MarinaOverview() {
  const [dateRange, setDateRange] = useState(12);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const generateMonthlyData = () => {
    const data: DockStats[] = [];
    for (let i = -dateRange; i <= 2; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      const isProjected = i > 0;
      
      let occupied = Math.floor(Math.random() * 30) + 20;
      let available = Math.floor(Math.random() * 20) + 10;
      let maintenance = Math.floor(Math.random() * 10) + 5;
      
      if (isProjected) {
        const growthRate = 1.05;
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

  const handleNavigate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Marina Overview</CardTitle>
        <DateRangeControls
          currentDate={currentDate}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onNavigate={handleNavigate}
        />
      </CardHeader>
      <CardContent>
        <MarinaStats
          stats={{
            occupied: currentMonthStats?.occupied || 0,
            available: currentMonthStats?.available || 0,
            maintenance: currentMonthStats?.maintenance || 0
          }}
          previousMonthComparison={{
            occupied: "↑ 8% compared to previous month",
            available: "↓ 3% compared to previous month",
            maintenance: "Stable month-over-month"
          }}
        />
        <MarinaChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}