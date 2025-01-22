import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { Column } from "@/components/common/DataTable/types";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      console.log('Fetching slots...');
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        console.error('Error fetching slots:', error);
        throw error;
      }

      console.log('Fetched slots:', data);
      return (data || []).map((slot): Slot => ({
        ...slot,
        id: slot.id,
        user_id: slot.user_id || null,
        status: slot.status as 'available' | 'occupied' | 'maintenance'
      }));
    }
  });

  const columns: Column<Slot>[] = [
    { 
      header: "Name", 
      accessorKey: "name",
      sortable: true 
    },
    { 
      header: "Status", 
      accessorKey: "status",
      sortable: true 
    },
    { 
      header: "Length (ft)", 
      accessorKey: "length_ft",
      sortable: true 
    },
    { 
      header: "Width (ft)", 
      accessorKey: "width_ft",
      sortable: true 
    },
    { 
      header: "Covered", 
      accessorKey: "is_covered",
      cell: (slot: Slot) => slot.is_covered ? "Yes" : "No",
      sortable: true 
    },
    { 
      header: "Water", 
      accessorKey: "has_water",
      cell: (slot: Slot) => slot.has_water ? "Yes" : "No",
      sortable: true 
    },
    { 
      header: "Electricity", 
      accessorKey: "electricity_voltage",
      sortable: true 
    },
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