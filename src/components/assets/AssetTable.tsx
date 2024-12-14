import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableFiltersBar } from "@/components/common/DataTable/DataTableFiltersBar";
import { useState } from "react";
import { ASSET_TYPES } from "./form/AssetFormFields";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
}

export function AssetTable({ assets, onEdit, onViewDetails }: AssetTableProps) {
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
          label: asset.customers?.name || 'Unassigned',
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

  return (
    <div className="space-y-4">
      <DataTableFiltersBar filters={filters} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No assets found
              </TableCell>
            </TableRow>
          ) : (
            filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.asset_name}</TableCell>
                <TableCell>{asset.asset_size || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {asset.asset_type || 'Unspecified'}
                  </Badge>
                </TableCell>
                <TableCell>{asset.customers?.name || 'Unassigned'}</TableCell>
                <TableCell>{asset.slots?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(asset)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(asset)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}