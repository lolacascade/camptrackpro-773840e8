import { Customer } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/common/DataTable/types";

export const getCustomerColumns = (): Column<Customer>[] => [
  {
    header: "Name",
    accessorKey: "first_name",
    cell: (item: Customer) => {
      const isVip = item.lifetime_value ? parseFloat(item.lifetime_value) >= 10000 : false;
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
    cell: (item: Customer) => item.phone || '-',
    sortable: true
  },
  {
    header: "Location",
    accessorKey: "city",
    cell: (item: Customer) => {
      const location = [item.city, item.state].filter(Boolean).join(', ');
      return location || '-';
    },
    sortable: true
  }
];