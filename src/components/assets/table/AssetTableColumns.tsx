
import { Column } from "@/components/common/DataTable/types";
import { Asset } from "@/types/asset";

export const getAssetColumns = (): Column<Asset>[] => [
  {
    header: "Make & Model",
    accessorKey: "make",
    cell: (asset: Asset) => `${asset.make} ${asset.model}`,
    sortable: true
  },
  {
    header: "Year",
    accessorKey: "year",
    cell: (asset: Asset) => asset.year || '-',
    sortable: true
  },
  {
    header: "Created",
    accessorKey: "created_at",
    cell: (asset: Asset) => asset.created_at ? new Date(asset.created_at).toLocaleDateString() : '-',
    sortable: true
  }
];
