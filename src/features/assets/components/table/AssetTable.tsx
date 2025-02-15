
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
  isLoading?: boolean;
}

export function AssetTable({ assets, onEdit, onViewDetails, isLoading }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = useMemo(() => {
    if (!searchTerm) return assets;
    
    const term = searchTerm.toLowerCase();
    return assets.filter(asset => 
      asset.asset_name?.toLowerCase().includes(term) ||
      asset.asset_type?.toLowerCase().includes(term) ||
      asset.asset_size?.toLowerCase().includes(term) ||
      asset.customer?.first_name?.toLowerCase().includes(term) ||
      asset.customer?.last_name?.toLowerCase().includes(term)
    );
  }, [assets, searchTerm]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-[200px]" />
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
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>
                    <Badge variant="secondary">
                      {asset.asset_type || 'Unspecified'}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.asset_size || 'N/A'}</TableCell>
                  <TableCell>
                    {asset.customer 
                      ? `${asset.customer.first_name} ${asset.customer.last_name}`
                      : 'Unassigned'}
                  </TableCell>
                  <TableCell>{asset.status}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
