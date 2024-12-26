import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { MarinaChart } from "@/components/marina/chart/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { useMarineStats } from "@/hooks/marina/use-marina-stats";
import { MarinaStatsCards } from "@/components/marina/overview/MarinaStatsCards";
import { MarinaHeader } from "@/components/marina/overview/MarinaHeader";
import { SlotTable } from "@/components/marina/SlotTable";
import { useState } from "react";
import { Slot } from "@/types/slot";
import { AddDockSpotDialog } from "@/components/marina/AddDockSpotDialog";

export default function Map() {
  const { data: stats, isLoading } = useMarineStats();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <MarinaHeader title="Map" />
          
          {stats && <MarinaStatsCards stats={stats} />}

          <Card className="border border-[#E8EBEB] bg-transparent">
            <CardContent className="p-6">
              <MarinaChart chartData={generateMonthlyData()} />
            </CardContent>
          </Card>

          <SlotTable onEdit={handleEdit} />

          <AddDockSpotDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onDockSpotAdded={() => {
              setIsDialogOpen(false);
              setSelectedSlot(null);
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}