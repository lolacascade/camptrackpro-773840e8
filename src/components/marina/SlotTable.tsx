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

      console.log('Fetched slots:', data);
      return data || [];
    }
  });

  const handleDelete = async (slot: Slot) => {
    try {
      const slotId = typeof slot.id === 'string' ? parseInt(slot.id, 10) : slot.id;
      
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', slotId);

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