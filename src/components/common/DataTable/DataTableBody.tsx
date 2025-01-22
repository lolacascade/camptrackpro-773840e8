import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DataTableRowActions } from "./DataTableRowActions";
import { Column } from "./types";

interface DataTableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  onViewDetails?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onRowClick?: (item: T) => void;
}

export function DataTableBody<T extends { id?: number | string }>({
  data,
  columns,
  onViewDetails,
  onEdit,
  onDelete,
  onRowClick,
}: DataTableBodyProps<T>) {
  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + 1}
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
          className={`hover:bg-[#F8F9F9] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((column, index) => (
            <TableCell key={index}>
              {column.cell
                ? column.cell(item)
                : String(item[column.accessorKey] || "")}
            </TableCell>
          ))}
          <TableCell>
            <DataTableRowActions
              row={item}
              onEdit={onEdit}
              onViewDetails={onViewDetails}
              onDelete={onDelete}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}