import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useState } from "react";
import { Slot } from "@/types/slot";
import { AddDockSpotDialog } from "@/components/marina/AddDockSpotDialog";
import { SlotTable } from "@/components/marina/SlotTable";

export default function Map() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#133134]">Map</h1>
          
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