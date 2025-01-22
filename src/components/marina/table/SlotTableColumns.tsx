import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/common/DataTable/types";
import { Slot } from "@/types/slot";

export const getSlotColumns = (): Column<Slot>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (slot: Slot) => {
      const colorMap = {
        available: "bg-green-100 text-green-800",
        occupied: "bg-blue-100 text-blue-800",
        maintenance: "bg-yellow-100 text-yellow-800",
      };

      return (
        <Badge 
          className={`${colorMap[slot.status]} border-none`}
        >
          {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
        </Badge>
      );
    },
  },
  {
    header: "Length (ft)",
    accessorKey: "length_ft",
    sortable: true,
    cell: (slot: Slot) => slot.length_ft?.toString() || 'N/A',
  },
  {
    header: "Width (ft)",
    accessorKey: "width_ft",
    sortable: true,
    cell: (slot: Slot) => slot.width_ft?.toString() || 'N/A',
  },
  {
    header: "Electricity",
    accessorKey: "electricity_voltage",
    sortable: true,
    cell: (slot: Slot) => slot.electricity_voltage || 'N/A',
  },
  {
    header: "Features",
    accessorKey: "features",
    cell: (slot: Slot) => (
      <div className="space-x-2">
        {slot.is_covered && (
          <Badge variant="outline">Covered</Badge>
        )}
        {slot.has_water && (
          <Badge variant="outline">Water</Badge>
        )}
      </div>
    ),
  },
];