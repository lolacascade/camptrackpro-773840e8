import { Customer } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Column } from "@/components/common/DataTable/types";

export const getCustomerColumns = (): Column<Customer>[] => [
  {
    header: "Name",
    accessorKey: "first_name",
    cell: (item: Customer) => {
      const isVip = (item.lifetime_value || 0) >= 10000; // VIP threshold at $10,000
      const fullName = `${item.first_name} ${item.last_name}`;
      
      return (
        <div className="flex items-center gap-2">
          <span>{fullName}</span>
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