import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { Slot } from "@/types/slot";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { getSlotColumns } from "./table/SlotTableColumns";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        toast.error("Failed to fetch slots");
        return [];
      }

      return data as Slot[];
    }
  });

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
      toast.error("Failed to delete slot");
    }
  };

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (slot: Slot) => {
    // This will be implemented in the future for the Spot Detail Page
    console.log('View details for slot:', slot);
    toast.info("Spot Detail Page coming soon!");
  };

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Available", value: "available" },
    { label: "Occupied", value: "occupied" },
    { label: "Maintenance", value: "maintenance" }
  ];

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
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable<Slot>
          data={slots}
          columns={getSlotColumns()}
          isLoading={isLoading}
          tableName="slots"
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: "all",
              onChange: () => {},
            }
          ]}
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
      </div>
    </Card>
  );
}