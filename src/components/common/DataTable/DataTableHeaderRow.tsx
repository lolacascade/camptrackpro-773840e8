
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Column } from "./types";

interface DataTableHeaderRowProps<T> {
  columns: Column<T>[];
}

export function DataTableHeaderRow<T>({
  columns,
}: DataTableHeaderRowProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead
            key={index}
            className="text-[#133134]"
          >
            <div className="flex items-center gap-2">
              {column.header}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
