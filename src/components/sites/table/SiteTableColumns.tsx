import { ColumnDef } from "@tanstack/react-table";
import { Site } from "@/types/site";
import { Badge } from "@/components/ui/badge";

export const getSiteColumns = (): ColumnDef<Site>[] => [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.status}
      </Badge>
    ),
  },
  {
    header: "Size",
    cell: ({ row }) => {
      const site = row.original;
      if (!site.length_ft && !site.width_ft) return "N/A";
      return `${site.length_ft || 0}' x ${site.width_ft || 0}'`;
    },
  },
  {
    header: "Utilities",
    cell: ({ row }) => {
      const site = row.original;
      const utilities = [];
      if (site.has_water) utilities.push("Water");
      if (site.electricity_voltage) utilities.push("Electric");
      if (site.is_covered) utilities.push("Covered");
      return utilities.join(", ") || "None";
    },
  },
  {
    header: "Location",
    accessorKey: "location_identifier",
  },
];