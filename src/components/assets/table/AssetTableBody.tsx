import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { AssetTableRow } from "./AssetTableRow";

interface AssetTableBodyProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
}

export function AssetTableBody({ assets, onEdit, onViewDetails }: AssetTableBodyProps) {
  if (assets.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center py-4">
            No assets found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {assets.map((asset) => (
        <AssetTableRow
          key={asset.id}
          asset={asset}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      ))}
    </TableBody>
  );
}