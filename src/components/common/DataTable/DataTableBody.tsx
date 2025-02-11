
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Column } from "./types";

interface DataTableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTableBody<T extends { id?: number | string }>({
  data,
  columns,
  onRowClick,
}: DataTableBodyProps<T>) {
  console.log('DataTableBody received data:', data);

  if (!data || data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="text-center py-4"
          >
            No items found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((item) => (
        <TableRow 
          key={item.id}
          className="hover:bg-[#F8F9F9] transition-colors cursor-pointer"
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((column, index) => (
            <TableCell key={index}>
              {column.cell
                ? column.cell(item)
                : item[column.accessorKey as keyof T] !== null 
                  ? String(item[column.accessorKey as keyof T])
                  : 'N/A'}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
