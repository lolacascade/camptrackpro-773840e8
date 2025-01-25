import { Column } from "@/components/common/DataTable/types";
import { Site } from "@/types/site";
import { Badge } from "@/components/ui/badge";

export const getSiteColumns = (): Column<Site>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (site: Site) => (
      <Badge variant="secondary">
        {site.status}
      </Badge>
    ),
    sortable: true
  },
  {
    header: "Size",
    cell: (site: Site) => {
      if (!site.length_ft && !site.width_ft) return "N/A";
      return `${site.length_ft || 0}' x ${site.width_ft || 0}'`;
    },
    sortable: true
  },
  {
    header: "Utilities",
    cell: (site: Site) => {
      const utilities = [];
      if (site.has_water) utilities.push("Water");
      if (site.electricity_voltage) utilities.push("Electric");
      if (site.is_covered) utilities.push("Covered");
      return utilities.join(", ") || "None";
    }
  },
  {
    header: "Location",
    accessorKey: "location_identifier",
    sortable: true
  }
];