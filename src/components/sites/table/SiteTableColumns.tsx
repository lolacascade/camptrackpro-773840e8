
import { Column } from "@/components/common/DataTable/types";
import { Site } from "@/types/site";

export const getSiteColumns = (): Column<Site>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true
  },
  {
    header: "Location",
    accessorKey: "location",
    sortable: true
  }
];
