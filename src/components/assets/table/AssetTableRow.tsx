
import { TableCell, TableRow } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink } from "lucide-react";

interface AssetTableRowProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
}

export function AssetTableRow({ asset, onEdit, onViewDetails }: AssetTableRowProps) {
  return (
    <TableRow className="cursor-pointer hover:bg-gray-50">
      <TableCell className="font-medium">
        {asset.make} {asset.model} {asset.year || ''}
      </TableCell>
      <TableCell>{asset.year || 'N/A'}</TableCell>
      <TableCell>{asset.site_id || 'Unassigned'}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
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
  );
}
