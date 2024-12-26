import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { format, subMonths, addMonths } from "date-fns";
import { useMarineStats } from "@/hooks/marina/use-marina-stats";
import { MarinaStatsCards } from "@/components/marina/overview/MarinaStatsCards";
import { SlotTable } from "@/components/marina/SlotTable";
import { useState } from "react";
import { Slot } from "@/types/slot";
import { AddDockSpotDialog } from "@/components/marina/AddDockSpotDialog";

export default function Map() {
  const { data: stats, isLoading } = useMarineStats();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#133134]">Map</h1>
          
          {stats && <MarinaStatsCards stats={stats} />}

          <SlotTable onEdit={handleEdit} />

          {isDrawerOpen && (
            <AddDockSpotDialog
              isOpen={isDrawerOpen}
              onClose={() => {
                setIsDrawerOpen(false);
                setSelectedSlot(null);
              }}
              initialData={selectedSlot}
            />
          )}
        </div>
      </PageContainer>
    </PageWithChat>
  );
}