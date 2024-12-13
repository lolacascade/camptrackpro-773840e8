import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, Copy, Trash } from "lucide-react";

interface DataTableRowActionsProps<T> {
  row: T;
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  onDuplicate?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTableRowActions<T>({
  row,
  onEdit,
  onViewDetails,
  onDuplicate,
  onDelete,
}: DataTableRowActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 opacity-100 data-[state=open]:opacity-100"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white border border-[#E8EBEB] shadow-lg"
      >
        {onViewDetails && (
          <DropdownMenuItem 
            onClick={() => onViewDetails(row)}
            className="text-[#133134] hover:bg-[#F8F9F9]"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem 
            onClick={() => onDuplicate(row)}
            className="text-[#133134] hover:bg-[#F8F9F9]"
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(row)}
            className="text-red-600 hover:bg-[#F8F9F9]"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}