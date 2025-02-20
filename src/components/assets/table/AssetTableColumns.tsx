
import { Asset } from "@/types/asset";
import { Column } from "@/components/common/DataTable/types";

export const getAssetColumns = (): Column<Asset>[] => [
  {
    header: "Make/Model",
    accessorKey: "make",
    cell: (asset: Asset) => {
      return `${asset.make} ${asset.model}`;
    },
    sortable: true
  },
  {
    header: "Year",
    accessorKey: "year",
    cell: (asset: Asset) => asset.year || 'N/A',
    sortable: true
  },
  {
    header: "Site",
    accessorKey: "site_id",
    cell: (asset: Asset) => asset.site?.name || 'Unassigned',
    sortable: true
  }
];
