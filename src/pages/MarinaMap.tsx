import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { MarinaChart } from "@/components/marina/chart/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useMarineStats } from "@/hooks/marina/use-marina-stats";
import { MarinaStatsCards } from "@/components/marina/overview/MarinaStatsCards";
import { MarinaHeader } from "@/components/marina/overview/MarinaHeader";

export default function MarinaMap() {
  const { data: marinaStats, isLoading } = useMarineStats();

  // Generate sample data for the chart
  const generateMonthlyData = () => {
    const currentDate = new Date();
    const data = [];
    for (let i = -12; i <= 2; i++) {
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

  const handleAddDock = () => {
    // TODO: Implement add site functionality
    console.log('Add site clicked');
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <MarinaHeader onAddDock={handleAddDock} title="Camp Map" />
          
          {marinaStats && <MarinaStatsCards stats={marinaStats} />}

          <Card className="border border-[#E8EBEB] bg-transparent">
            <CardContent className="p-6">
              <MarinaChart chartData={generateMonthlyData()} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive campsite map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
