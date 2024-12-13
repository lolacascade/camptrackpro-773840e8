import { Column } from "@/components/common/DataTable/types";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Edit2, ArrowUpDown } from "lucide-react";

export const getCustomerColumns = (onEdit: (customer: Customer) => void): Column<Customer>[] => [
  {
    header: "Name",
    accessorKey: "name",
    sortable: true,
    cell: (customer) => (
      <span className="font-medium text-[#133134]">{customer.name}</span>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    sortable: true,
    cell: (customer) => (
      <span className="text-[#3E4238]">{customer.email}</span>
    ),
  },
  {
    header: "Phone",
    accessorKey: "phone",
    sortable: true,
    cell: (customer) => (
      <span className="text-[#3E4238]">{customer.phone}</span>
    ),
  },
  {
    header: "Address",
    accessorKey: "address",
    sortable: true,
    cell: (customer) => (
      <span className="text-[#3E4238]">{customer.address}</span>
    ),
  },
];