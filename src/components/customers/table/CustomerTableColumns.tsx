import { Customer } from "@/types/customer";
import { Column } from "@/components/common/DataTable/types";

export const getCustomerColumns = (): Column<Customer>[] => [
  {
    header: "Name",
    accessorKey: "first_name",
    cell: (item: Customer) => {
      const fullName = `${item.first_name} ${item.last_name}`;
      return <span>{fullName}</span>;
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