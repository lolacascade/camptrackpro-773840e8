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

// Map of asset types to their display names
const ASSET_TYPE_DISPLAY_NAMES: Record<string, string> = {
  'speed_boat': 'Speed Boat',
  'sailboat': 'Sailboat',
  'fishing_boat': 'Fishing Boat',
  'pontoon_boat': 'Pontoon Boat',
  'yacht': 'Yacht',
  'catamaran': 'Catamaran',
  'kayak': 'Kayak',
  'rowboat': 'Rowboat',
  'houseboat': 'Houseboat',
  'cruise_boat': 'Cruise Boat',
  'jet_ski': 'Jet Ski',
  'boat': 'Boat',
  'other': 'Other'
};

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
        { label: "Speed Boat", value: "speed_boat" },
        { label: "Jet Ski", value: "jet_ski" },
        { label: "Yacht", value: "yacht" },
        { label: "Boat", value: "boat" }
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

  const getAssetTypeDisplayName = (type: string | null): string => {
    if (!type) return 'Unspecified';
    return ASSET_TYPE_DISPLAY_NAMES[type] || type;
  };

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
                    {getAssetTypeDisplayName(asset.asset_type)}
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