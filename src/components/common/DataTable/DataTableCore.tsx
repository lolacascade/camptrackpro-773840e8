import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableCoreProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
  }[];
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTableCore<T extends { id?: number | string }>({
  data,
  columns,
  onEdit,
  onViewDetails,
  isLoading,
}: DataTableCoreProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className="text-[#133134]">
              {column.header}
            </TableHead>
          ))}
          {(onEdit || onViewDetails) && (
            <TableHead className="text-[#133134]">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + (onEdit || onViewDetails ? 1 : 0)}
              className="text-center py-4"
            >
              No items found
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.cell
                    ? column.cell(item)
                    : String(item[column.accessorKey] || "")}
                </TableCell>
              ))}
              {(onEdit || onViewDetails) && (
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {onViewDetails && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(item)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}