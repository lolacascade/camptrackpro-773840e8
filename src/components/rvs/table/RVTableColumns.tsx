
import { Column } from "@/components/common/DataTable/types";
import { RV } from "@/types/rv";

export const getRVColumns = (): Column<RV>[] => [
  {
    header: "Make/Model",
    accessorKey: "make",
    cell: (rv: RV) => `${rv.make} ${rv.model}`
  },
  {
    header: "Year",
    accessorKey: "year",
    cell: (rv: RV) => rv.year || 'N/A'
  },
  {
    header: "Site",
    accessorKey: "site",
    cell: (rv: RV) => rv.site?.name || 'Unassigned'
  }
];
