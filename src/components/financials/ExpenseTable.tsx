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
    },
    {
      header: "Type",
      accessorKey: "category",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (row: any) => `$${row.getValue().toLocaleString()}`,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (row: any) => format(new Date(row.getValue()), 'MMM dd, yyyy'),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: any) => (
        <span className={`capitalize ${
          row.getValue() === 'completed' ? 'text-green-600' : 
          row.getValue() === 'pending' ? 'text-yellow-600' : 'text-gray-600'
        }`}>
          {row.getValue()}
        </span>
      ),
    },
  ];

  const typeOptions = [
    { label: "All Types", value: "" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Utilities", value: "Utilities" },
    { label: "Supplies", value: "Supplies" },
    { label: "Administrative Costs", value: "Administrative Costs" },
    { label: "Taxes", value: "Taxes" },
    { label: "Capital Expenditures", value: "Capital Expenditures" },
  ];

  const statusOptions = [
    { label: "All Statuses", value: "" },
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
          value: "",
          onChange: () => {},
        },
        {
          name: "status",
          options: statusOptions,
          value: "",
          onChange: () => {},
        },
      ]}
    />
  );
}