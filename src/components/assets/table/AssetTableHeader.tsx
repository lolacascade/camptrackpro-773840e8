import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AssetTableHeader() {
  return (
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
  );
}