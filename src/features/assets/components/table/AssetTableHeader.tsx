
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AssetTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function AssetTableHeader({ searchTerm, onSearchChange }: AssetTableHeaderProps) {
  return (
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
  );
}
