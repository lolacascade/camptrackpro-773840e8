import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Column, SortConfig } from "./types";

interface DataTableHeaderRowProps<T> {
  columns: Column<T>[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
}

export function DataTableHeaderRow<T>({
  columns,
  sortConfig,
  onSort,
}: DataTableHeaderRowProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead
            key={index}
            className={`text-[#133134] ${column.sortable ? 'cursor-pointer select-none' : ''}`}
            onClick={() => column.sortable && onSort?.(column.accessorKey as string)}
          >
            <div className="flex items-center gap-2">
              {column.header}
              {column.sortable && sortConfig?.key === column.accessorKey && (
                <span className="inline-block">
                  {sortConfig.direction === 'asc' ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                </span>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}