import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) throw error;

      return (data || []).map((slot): Slot => ({
        ...slot,
        id: String(slot.id),
        user_id: slot.user_id || null,
        status: slot.status as 'available' | 'occupied' | 'maintenance'
      }));
    }
  });

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Status", accessorKey: "status" },
    { header: "Length (ft)", accessorKey: "length_ft" },
    { header: "Width (ft)", accessorKey: "width_ft" },
    { header: "Covered", accessorKey: "is_covered", 
      cell: ({ row }: { row: any }) => row.original.is_covered ? "Yes" : "No" 
    },
    { header: "Water", accessorKey: "has_water",
      cell: ({ row }: { row: any }) => row.original.has_water ? "Yes" : "No"
    },
    { header: "Electricity", accessorKey: "electricity_voltage" },
  ];

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={slots}
          columns={columns}
          isLoading={isLoading}
          tableName="slots"
          onRowClick={onEdit}
        />
      </div>
    </Card>
  );
}