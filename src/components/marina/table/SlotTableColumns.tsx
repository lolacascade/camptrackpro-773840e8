import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/common/DataTable/types";
import { Slot } from "@/types/slot";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (slot: Slot) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            console.log('View details:', slot);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Edit:', slot);
          }}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Delete:', slot);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];