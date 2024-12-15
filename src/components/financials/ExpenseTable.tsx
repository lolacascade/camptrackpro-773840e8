import { DataTable } from "@/components/common/DataTable/DataTable";
import { format } from "date-fns";
import type { Expense } from "@/types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
  onViewDetails?: (expense: Expense) => void;
}

export function ExpenseTable({ expenses, onEdit, onDelete, onViewDetails }: ExpenseTableProps) {
  const columns = [
    {
      header: "Description",
      accessorKey: "description",
      cell: (item: Expense) => item.description,
    },
    {
      header: "Type",
      accessorKey: "category",
      cell: (item: Expense) => item.category,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (item: Expense) => `$${Number(item.amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (item: Expense) => format(new Date(item.date), 'MMM dd, yyyy'),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: Expense) => (
        <span className={`capitalize ${
          item.status === 'completed' ? 'text-green-600' : 
          item.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
        }`}>
          {item.status}
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
      onDelete={onDelete}
      onViewDetails={onViewDetails}
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
      tableName="expenses"
    />
  );
}