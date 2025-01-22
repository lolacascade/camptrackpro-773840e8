import { Column } from "@/components/common/DataTable/types";
import { Slot } from "@/types/slot";
import { Badge } from "@/components/ui/badge";

export const getSlotColumns = (): Column<Slot>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true,
  },
  {
    header: "Location",
    accessorKey: "location_identifier",
    sortable: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (row) => {
      const status = row.status;
      const colorMap = {
        available: "bg-green-100 text-green-800",
        occupied: "bg-blue-100 text-blue-800",
        maintenance: "bg-yellow-100 text-yellow-800",
      };

      return (
        <Badge 
          className={`${colorMap[status as keyof typeof colorMap]} border-none`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    header: "Length (ft)",
    accessorKey: "length_ft",
    sortable: true,
  },
  {
    header: "Width (ft)",
    accessorKey: "width_ft",
    sortable: true,
  },
  {
    header: "Electricity",
    accessorKey: "electricity_voltage",
    sortable: true,
  },
];