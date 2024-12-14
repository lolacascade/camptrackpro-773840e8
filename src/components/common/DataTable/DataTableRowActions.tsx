import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink, Copy, Trash, Edit } from "lucide-react";

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
          className="h-8 w-8 p-0 hover:bg-transparent"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-[#133134]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[160px] bg-white border border-[#E8EBEB] shadow-lg rounded-md"
        style={{ zIndex: 1000 }}
      >
        {onEdit && (
          <DropdownMenuItem 
            onClick={() => onEdit(row)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-[#133134] hover:bg-[#F8F9F9]"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
        )}
        {onViewDetails && (
          <DropdownMenuItem 
            onClick={() => onViewDetails(row)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-[#133134] hover:bg-[#F8F9F9]"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem 
            onClick={() => onDuplicate(row)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-[#133134] hover:bg-[#F8F9F9]"
          >
            <Copy className="h-4 w-4" />
            <span>Duplicate</span>
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(row)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-[#F8F9F9]"
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}