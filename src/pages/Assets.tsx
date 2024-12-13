import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import type { Column } from "@/components/common/DataTable/types";
import type { Asset } from "@/types/asset";
import { useAssets } from "@/hooks/assets/use-assets";
import { useSession } from "@supabase/auth-helpers-react";

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSession();
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
      accessorKey: "customers",
      cell: (asset) => asset.customers?.name || 'Unassigned',
    },
    {
      header: "Slot",
      accessorKey: "slots",
      cell: (asset) => asset.slots?.name || 'Unassigned',
    },
  ];

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg text-gray-600">Please sign in to view assets</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-[#133134]">Assets</h1>
      <DataTable
        data={assets || []}
        columns={columns}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title="Assets"
      />
    </div>
  );
}