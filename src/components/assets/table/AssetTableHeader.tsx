import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AssetTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function AssetTableHeader({ searchTerm, onSearchChange }: AssetTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead colSpan={6}>
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </TableHead>
      </TableRow>
      <TableRow>
        <TableHead>Asset Name</TableHead>
        <TableHead>Size</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Slot</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}