import { Table } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { DataTableFiltersBar } from "@/components/common/DataTable/DataTableFiltersBar";
import { useState } from "react";
import { ASSET_TYPES } from "./form/AssetFormFields";
import { AssetTableHeader } from "./table/AssetTableHeader";
import { AssetTableBody } from "./table/AssetTableBody";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  isLoading?: boolean;
}

export function AssetTable({ assets, onEdit, onViewDetails, isLoading }: AssetTableProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");

  const filters = [
    {
      name: "type",
      options: [
        { label: "All Types", value: "all" },
        ...ASSET_TYPES
      ],
      value: typeFilter,
      onChange: setTypeFilter
    },
    {
      name: "customer",
      options: [
        { label: "All Customers", value: "all" },
        ...(assets?.map(asset => ({
          label: asset.customers ? `${asset.customers.first_name} ${asset.customers.last_name}` : 'Unassigned',
          value: String(asset.customer_id || 'unassigned')
        })) || [])
      ],
      value: customerFilter,
      onChange: setCustomerFilter
    }
  ];

  const filteredAssets = assets.filter(asset => {
    if (typeFilter !== "all" && asset.asset_type !== typeFilter) return false;
    if (customerFilter !== "all" && asset.customer_id?.toString() !== customerFilter) return false;
    return true;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <DataTableFiltersBar filters={filters} />
      <div className="rounded-lg border border-[#E8EBEB] bg-white overflow-hidden">
        <Table>
          <AssetTableHeader />
          <AssetTableBody
            assets={filteredAssets}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
          />
        </Table>
      </div>
    </div>
  );
}