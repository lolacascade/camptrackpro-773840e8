import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { getSlotColumns } from "./table/SlotTableColumns";
import { toast } from "sonner";

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

  const handleViewDetails = (slot: Slot) => {
    console.log('View details for slot:', slot);
    toast.info("Viewing slot details");
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={slots}
          columns={getSlotColumns()}
          isLoading={isLoading}
          tableName="slots"
          onViewDetails={handleViewDetails}
          onEdit={onEdit}
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
      </div>
    </Card>
  );
}