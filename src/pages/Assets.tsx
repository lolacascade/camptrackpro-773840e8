import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import type { Column } from "@/components/common/DataTable/types";
import { Asset } from "@/types/asset";
import { useAssets } from "@/hooks/assets/use-assets";

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: assets, isLoading } = useAssets();

  const columns: Column<Asset>[] = [
    {
      header: "Asset Name",
      accessorKey: "asset_name",
      sortable: true,
    },
    {
      header: "Size",
      accessorKey: "asset_size",
      sortable: true,
    },
    {
      header: "Type",
      accessorKey: "asset_type",
      sortable: true,
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (asset) => asset.customers?.name || 'Unassigned',
    },
    {
      header: "Slot",
      accessorKey: "slot",
      cell: (asset) => asset.slots?.name || 'Unassigned',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#133134]">Assets</h1>
      <DataTable
        data={assets || []}
        columns={columns}
        isLoading={isLoading}
        onSearchChange={setSearchTerm}
        title="Assets"
      />
    </div>
  );
}
