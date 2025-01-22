import { Table } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { useState } from "react";
import { ASSET_TYPES } from "./form/AssetFormFields";
import { AssetTableHeader } from "./table/AssetTableHeader";
import { AssetTableBody } from "./table/AssetTableBody";
import { Card } from "@/components/ui/card";
import { SelectField } from "@/components/common/FormFields/SelectField";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  isLoading?: boolean;
}

export function AssetTable({ assets, onEdit, onViewDetails, isLoading }: AssetTableProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Create unique customer options from assets
  const customerOptions = [
    { label: "All Customers", value: "all" },
    ...Array.from(new Set(assets?.map(asset => asset.customer_id)))
      .filter(Boolean)
      .map(customerId => {
        const asset = assets.find(a => a.customer_id === customerId);
        return {
          label: asset?.customers ? `${asset.customers.first_name} ${asset.customers.last_name}` : 'Unassigned',
          value: String(customerId)
        };
      })
  ];

  // Filter assets based on all criteria
  const filteredAssets = assets?.filter(asset => {
    // Type filter
    if (typeFilter !== "all" && asset.asset_type !== typeFilter) return false;
    
    // Customer filter
    if (customerFilter !== "all" && String(asset.customer_id) !== customerFilter) return false;
    
    // Search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        asset.asset_name?.toLowerCase().includes(searchLower) ||
        asset.asset_type?.toLowerCase().includes(searchLower) ||
        asset.asset_size?.toLowerCase().includes(searchLower) ||
        asset.customers?.first_name?.toLowerCase().includes(searchLower) ||
        asset.customers?.last_name?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }) || [];

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <SelectField
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: "All Types", value: "all" },
              ...ASSET_TYPES
            ]}
            placeholder="Filter by type"
            className="w-[200px]"
          />
          <SelectField
            value={customerFilter}
            onChange={setCustomerFilter}
            options={customerOptions}
            placeholder="Filter by customer"
            className="w-[200px]"
          />
        </div>
        <Table>
          <AssetTableHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <AssetTableBody
            assets={filteredAssets}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
          />
        </Table>
      </div>
    </Card>
  );
}