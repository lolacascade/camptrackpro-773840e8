
import { Column } from "@/components/common/DataTable/types";
import { RV } from "@/types/rv";

export const getRVColumns = (): Column<RV>[] => [
  {
    header: "Make",
    accessorKey: "make"
  },
  {
    header: "Model",
    accessorKey: "model"
  },
  {
    header: "Year",
    accessorKey: "year",
    cell: (rv: RV) => rv.year || "N/A"
  },
  {
    header: "Site",
    accessorKey: "site_id",
    cell: (rv: RV) => rv.site_id || "Unassigned"
  }
];
