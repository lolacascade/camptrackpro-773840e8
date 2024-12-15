import { DataTable } from "@/components/common/DataTable/DataTable";
import { format } from "date-fns";
import type { Expense } from "@/types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
}

export function ExpenseTable({ expenses, onEdit }: ExpenseTableProps) {
  const columns = [
    {
      header: "Description",
      accessorKey: "description",
      cell: (info: any) => info.row.original.description,
    },
    {
      header: "Type",
      accessorKey: "category",
      cell: (info: any) => info.row.original.category,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (info: any) => `$${Number(info.row.original.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (info: any) => format(new Date(info.row.original.date), 'MMM dd, yyyy'),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => (
        <span className={`capitalize ${
          info.row.original.status === 'completed' ? 'text-green-600' : 
          info.row.original.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
        }`}>
          {info.row.original.status}
        </span>
      ),
    },
  ];

  const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Utilities", value: "Utilities" },
    { label: "Supplies", value: "Supplies" },
    { label: "Administrative Costs", value: "Administrative Costs" },
    { label: "Taxes", value: "Taxes" },
    { label: "Capital Expenditures", value: "Capital Expenditures" },
  ];

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <DataTable
      data={expenses}
      columns={columns}
      onEdit={onEdit}
      title="Expenses"
      filters={[
        {
          name: "type",
          options: typeOptions,
          value: "all",
          onChange: () => {},
        },
        {
          name: "status",
          options: statusOptions,
          value: "all",
          onChange: () => {},
        },
      ]}
    />
  );
}