
import { Table } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { useState } from "react";
import { ASSET_TYPES } from "@/features/assets/components/form/AssetFormFields";
import { AssetTableHeader } from "@/features/assets/components/table/AssetTableHeader";
import { AssetTableBody } from "@/features/assets/components/table/AssetTableBody";
import { Card } from "@/components/ui/card";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  const customerOptions = [
    { label: "All Customers", value: "all" },
    ...Array.from(new Set(assets?.map(asset => asset.customer_id)))
      .filter(Boolean)
      .map(customerId => {
        const asset = assets.find(a => a.customer_id === customerId);
        return {
          label: asset?.customer ? `${asset.customer.first_name} ${asset.customer.last_name}` : 'Unassigned',
          value: String(customerId)
        };
      })
  ];

  const filteredAssets = assets?.filter(asset => {
    if (typeFilter !== "all" && asset.asset_type !== typeFilter) return false;
    if (customerFilter !== "all" && String(asset.customer_id) !== customerFilter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        asset.asset_name?.toLowerCase().includes(searchLower) ||
        asset.asset_type?.toLowerCase().includes(searchLower) ||
        asset.asset_size?.toLowerCase().includes(searchLower) ||
        asset.customer?.first_name?.toLowerCase().includes(searchLower) ||
        asset.customer?.last_name?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }) || [];

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
