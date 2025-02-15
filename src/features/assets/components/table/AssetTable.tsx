
import { Table } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { ASSET_TYPES } from "@/features/assets/components/form/AssetFormFields";
import { AssetTableHeader } from "@/features/assets/components/table/AssetTableHeader";
import { AssetTableBody } from "@/features/assets/components/table/AssetTableBody";
import { Card } from "@/components/ui/card";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AssetFilterState } from "@/types/asset";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  isLoading?: boolean;
  filters: AssetFilterState;
  onFiltersChange: (filters: AssetFilterState) => void;
  customerOptions: { label: string; value: string; }[];
}

export function AssetTable({ 
  assets, 
  onEdit, 
  onViewDetails, 
  isLoading,
  filters,
  onFiltersChange,
  customerOptions
}: AssetTableProps) {
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
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              className="pl-9"
            />
          </div>
          <SelectField
            value={filters.typeFilter}
            onChange={(value) => onFiltersChange({ ...filters, typeFilter: value })}
            options={[
              { label: "All Types", value: "all" },
              ...ASSET_TYPES
            ]}
            placeholder="Filter by type"
            className="w-[200px]"
          />
          <SelectField
            value={filters.customerFilter}
            onChange={(value) => onFiltersChange({ ...filters, customerFilter: value })}
            options={customerOptions}
            placeholder="Filter by customer"
            className="w-[200px]"
          />
        </div>
        <Table>
          <AssetTableHeader />
          <AssetTableBody
            assets={assets}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
          />
        </Table>
      </div>
    </Card>
  );
}
