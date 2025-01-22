import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { Column } from "@/components/common/DataTable/types";
import { Badge } from "@/components/ui/badge";

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
      cell: (slot: Slot) => {
        const colorMap: Record<string, string> = {
          available: "bg-green-100 text-green-800",
          occupied: "bg-blue-100 text-blue-800",
          maintenance: "bg-yellow-100 text-yellow-800"
        };

        return (
          <Badge 
            className={`${colorMap[slot.status]} border-none`}
          >
            {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
          </Badge>
        );
      },
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
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: "all",
              onChange: () => {} // This will be handled internally by DataTable
            }
          ]}
        />
      </div>
    </Card>
  );
}