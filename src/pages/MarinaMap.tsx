import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { MarinaChart } from "@/components/marina/chart/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";

export default function MarinaMap() {
  const [selectedDock, setSelectedDock] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#133134]">Marina Map</h1>
            <Button 
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Dock
            </Button>
          </div>

          <Card className="border border-[#E8EBEB] bg-transparent">
            <CardContent className="p-6">
              <MarinaChart chartData={generateMonthlyData()} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive marina map will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Total Slips</div>
                <div className="text-2xl font-bold mt-2">150</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Available</div>
                <div className="text-2xl font-bold mt-2">45</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Occupied</div>
                <div className="text-2xl font-bold mt-2">98</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium">Maintenance</div>
                <div className="text-2xl font-bold mt-2">7</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}