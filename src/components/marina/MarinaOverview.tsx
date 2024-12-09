import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarinaChart } from "@/components/dashboard/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
}

interface MarinaOverviewProps {
  className?: string;
}

export function MarinaOverview({ className = "" }: MarinaOverviewProps) {
  const currentDate = new Date();

  const { data: totalSlips } = useQuery({
    queryKey: ['total-slips'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('slips')
        .select('*', { count: 'exact' });

      if (error) {
        console.error('Error fetching total slips:', error);
        return 0;
      }

      return count || 0;
    },
  });
  
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
    <Card className={`col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8 ${className}`}>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-[#133134] text-2xl">Marina Overview</CardTitle>
          <div className="text-base text-[#3E4238]">
            Total Slips: {totalSlips}
            <span className="ml-2 text-sm text-[#3E4238]">↓ 5% compared to February</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <MarinaChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}