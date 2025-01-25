import { useState } from "react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "@/components/marina/table/SlotTableColumns";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";
import { SitemapHeader } from "@/components/marina/sitemap/SitemapHeader";
import { SitemapStats } from "@/components/marina/sitemap/SitemapStats";
import { useSitemapData } from "@/components/marina/sitemap/useSitemapData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { EntityDrawer } from "@/components/common/EntityDrawer";

export default function Sitemap() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { stats, statsLoading, slots, slotsLoading, refetch } = useSitemapData();

  const handleDelete = async (slot: Slot) => {
    try {
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', slot.id);

      if (error) throw error;

      toast.success("Slot deleted successfully");
      refetch();
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast.error("Failed to delete slot");
    }
  };

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const slotFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'available', label: 'Available' },
        { value: 'occupied', label: 'Occupied' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    },
    { name: 'length_ft', label: 'Length (ft)', type: 'number' as const },
    { name: 'width_ft', label: 'Width (ft)', type: 'number' as const },
    { 
      name: 'is_covered', 
      label: 'Is Covered', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { 
      name: 'has_water', 
      label: 'Has Water', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { name: 'electricity_voltage', label: 'Electricity Voltage', type: 'text' as const },
  ];

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <SitemapHeader onAddSpot={() => setIsDialogOpen(true)} />
          
          {stats && (
            <SitemapStats
              totalSlots={stats.totalSlots}
              occupiedSlots={stats.occupiedSlots}
              maintenanceSlots={stats.maintenanceSlots}
              occupancyRate={stats.occupancyRate}
            />
          )}

          <DataTable
            columns={getSlotColumns()}
            data={slots || []}
            isLoading={slotsLoading}
            tableName="slots"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <AddDockSpotDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDockSpotAdded={() => {
            setIsDialogOpen(false);
            refetch();
          }}
        />

        <EntityDrawer
          entity={selectedSlot}
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedSlot(null);
          }}
          onEntityUpdated={() => {
            refetch();
            setIsDrawerOpen(false);
            setSelectedSlot(null);
          }}
          title="Slot"
          fields={slotFields}
          tableName="slots"
        />
      </PageContainer>
    </PageWithChat>
  );
}