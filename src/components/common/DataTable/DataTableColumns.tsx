import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { useState } from "react";

interface DataTableColumnsProps<T> {
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  onColumnVisibilityChange: (columns: string[]) => void;
}

export function DataTableColumns<T>({ 
  columns, 
  onColumnVisibilityChange 
}: DataTableColumnsProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.accessorKey as string)
  );

  const toggleColumn = (columnKey: string) => {
    const updatedColumns = visibleColumns.includes(columnKey)
      ? visibleColumns.filter(key => key !== columnKey)
      : [...visibleColumns, columnKey];
    
    setVisibleColumns(updatedColumns);
    onColumnVisibilityChange(updatedColumns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.accessorKey as string}
            className="capitalize"
            checked={visibleColumns.includes(column.accessorKey as string)}
            onCheckedChange={() => toggleColumn(column.accessorKey as string)}
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}