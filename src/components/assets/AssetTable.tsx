import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Asset } from "@/types/asset";
import { Edit2, ArrowUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { AssetTableHeader } from "./AssetTableHeader";
import { AssetTablePagination } from "./AssetTablePagination";

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
}

export function AssetTable({ assets, onEdit }: AssetTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asset;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handleSort = (key: keyof Asset) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedAssets = useMemo(() => {
    let result = [...assets];

    if (searchTerm) {
      result = result.filter(
        (asset) =>
          asset.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.asset_size?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [assets, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedAssets.length / itemsPerPage);
  const paginatedAssets = filteredAndSortedAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortButton = ({ column }: { column: keyof Asset }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 data-[state=sorted]:bg-muted"
      onClick={() => handleSort(column)}
    >
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );

  return (
    <Card className="border border-[rgb(212,219,224)] rounded-2xl">
      <div className="p-4">
        <AssetTableHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Asset Name
                <SortButton column="asset_name" />
              </TableHead>
              <TableHead>
                Size
                <SortButton column="asset_size" />
              </TableHead>
              <TableHead>
                Slot Number
                <SortButton column="slot_id" />
              </TableHead>
              <TableHead>
                Customer ID
                <SortButton column="customer_id" />
              </TableHead>
              <TableHead>
                Type
                <SortButton column="asset_type" />
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.asset_name}</TableCell>
                <TableCell>{asset.asset_size}</TableCell>
                <TableCell>{asset.slot_id ? `Slot ${asset.slot_id}` : '-'}</TableCell>
                <TableCell>{asset.customer_id || '-'}</TableCell>
                <TableCell>{asset.asset_type}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(asset)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AssetTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  );
}