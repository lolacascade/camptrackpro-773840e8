import { Slot } from "@/types/slot";
import { Column } from "@/components/common/DataTable/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const getSlotColumns = (): Column<Slot>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true
  },
  {
    header: "Location",
    accessorKey: "location_identifier",
    sortable: true
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (item: Slot) => {
      const statusColors = {
        available: "bg-green-100 text-green-800",
        occupied: "bg-blue-100 text-blue-800",
        maintenance: "bg-yellow-100 text-yellow-800"
      };

      return (
        <Badge className={statusColors[item.status] || "bg-gray-100 text-gray-800"}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      );
    },
    sortable: true
  },
  {
    header: "Size",
    accessorKey: "length_ft",
    cell: (item: Slot) => 
      item.length_ft && item.width_ft 
        ? `${item.length_ft}' × ${item.width_ft}'`
        : "-",
    sortable: true
  },
  {
    header: "Features",
    accessorKey: "features",
    cell: (item: Slot) => {
      const features = [];
      if (item.is_covered) features.push("Covered");
      if (item.has_water) features.push("Water");
      if (item.electricity_voltage) features.push(`${item.electricity_voltage} Power`);
      return features.join(", ") || "-";
    }
  },
  {
    header: "Last Activity",
    accessorKey: "last_activity_at",
    cell: (item: Slot) => 
      item.last_activity_at 
        ? format(new Date(item.last_activity_at), "MMM d, yyyy")
        : "-",
    sortable: true
  }
];