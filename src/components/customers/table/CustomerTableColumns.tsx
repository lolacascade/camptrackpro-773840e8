import { Badge } from "@/components/ui/badge";
import { Customer } from "@/types/customer";
import { Column } from "@/components/common/DataTable/types";
import { format } from "date-fns";

export const getCustomerColumns = (): Column<Customer>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: (item: Customer) => {
      const isVip = (item.lifetime_value || 0) >= 10000; // VIP threshold at $10,000
      
      return (
        <div className="flex items-center gap-2">
          <span>{item.name}</span>
          {isVip && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              VIP
            </Badge>
          )}
        </div>
      );
    },
    sortable: true
  },
  {
    header: "Email",
    accessorKey: "email",
    sortable: true
  },
  {
    header: "Phone",
    accessorKey: "phone",
    sortable: true
  },
  {
    header: "Member Since",
    accessorKey: "created_at",
    cell: (item: Customer) => {
      if (!item.created_at) return null;
      return format(new Date(item.created_at), "MMM d, yyyy");
    },
    sortable: true
  }
];