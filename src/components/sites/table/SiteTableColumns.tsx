
import { Column } from "@/components/common/DataTable/types";
import { Site } from "@/types/site";

export const getSiteColumns = (): Column<Site>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: (site: Site) => site.name
  },
  {
    header: "Location",
    accessorKey: "location",
    cell: (site: Site) => site.location
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: (site: Site) => site.created_at ? new Date(site.created_at).toLocaleDateString() : 'N/A'
  }
];
