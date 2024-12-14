import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const customer = row.original;
      const isVip = customer.lifetime_value >= 10000; // Example threshold for VIP status
      
      return (
        <div className="flex items-center gap-2">
          <span>{customer.name}</span>
          {isVip && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              VIP
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Member Since",
    cell: ({ row }) => {
      const date = row.getValue("created_at");
      if (!date) return null;
      return format(new Date(date as string), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      
      return (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => console.log('Edit customer:', customer.id)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      );
    },
  },
];