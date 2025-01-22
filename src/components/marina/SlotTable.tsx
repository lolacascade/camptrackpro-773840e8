import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { getSlotColumns } from "./table/SlotTableColumns";
import { toast } from "sonner";
import { useState } from "react";
import { EntityDrawer } from "@/components/common/EntityDrawer";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Available", value: "available" },
  { label: "Occupied", value: "occupied" },
  { label: "Maintenance", value: "maintenance" }
];

export function SlotTable({ onEdit }: SlotTableProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      console.log('Fetching slots...');
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        console.error('Error fetching slots:', error);
        toast.error("Failed to fetch slots");
        return [];
      }

      // Ensure the data matches our Slot type
      const typedSlots = (data || []).map(slot => ({
        ...slot,
        id: Number(slot.id),
        status: slot.status as Slot['status'],
        is_covered: Boolean(slot.is_covered),
        has_water: Boolean(slot.has_water),
        length_ft: slot.length_ft ? Number(slot.length_ft) : null,
        width_ft: slot.width_ft ? Number(slot.width_ft) : null,
        maintenance_id: slot.maintenance_id ? Number(slot.maintenance_id) : null
      }));

      console.log('Fetched slots:', typedSlots);
      return typedSlots;
    }
  });

  const handleDelete = async (slot: Slot) => {
    try {
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', slot.id);

      if (error) {
        toast.error("Failed to delete slot");
        throw error;
      }

      toast.success("Slot deleted successfully");
      refetch();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const slotFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'status', label: 'Status', type: 'select' as const, required: true, 
      options: [
        { value: 'available', label: 'Available' },
        { value: 'occupied', label: 'Occupied' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    },
    { name: 'length_ft', label: 'Length (ft)', type: 'number' as const },
    { name: 'width_ft', label: 'Width (ft)', type: 'number' as const },
    { name: 'is_covered', label: 'Is Covered', type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { name: 'has_water', label: 'Has Water', type: 'select' as const,
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
        <DataTable
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