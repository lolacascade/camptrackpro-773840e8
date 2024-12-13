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
        <Button 
          variant="outline" 
          size="sm" 
          className="h-11 bg-white border-[#E8EBEB] text-[#133134]"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="bg-white border border-[#E8EBEB] shadow-lg"
      >
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.accessorKey as string}
            className="capitalize text-[#133134] hover:bg-[#F8F9F9]"
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