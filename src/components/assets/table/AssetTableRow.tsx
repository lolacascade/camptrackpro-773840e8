import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, ExternalLink } from "lucide-react";
import { Asset } from "@/types/asset";

interface AssetTableRowProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
}

export function AssetTableRow({ asset, onEdit, onViewDetails }: AssetTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{asset.asset_name}</TableCell>
      <TableCell>{asset.asset_size || 'N/A'}</TableCell>
      <TableCell>
        <Badge variant="secondary">
          {asset.asset_type || 'Unspecified'}
        </Badge>
      </TableCell>
      <TableCell>
        {asset.customer 
          ? `${asset.customer.first_name} ${asset.customer.last_name}`
          : 'Unassigned'}
      </TableCell>
      <TableCell>{asset.site?.name || 'Unassigned'}</TableCell>
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
  );
}