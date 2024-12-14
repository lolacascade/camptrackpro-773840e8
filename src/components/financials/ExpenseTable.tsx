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
      header: "Category",
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
    },
  ];

  return (
    <DataTable
      data={expenses}
      columns={columns}
      onEdit={onEdit}
      title="Expenses"
    />
  );
}