import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";
import { Expense } from "@/types/expense";
import { Column } from "@/components/common/DataTable/types";
import { format } from "date-fns";

const expenseCategories = [
  { label: "All Categories", value: "all" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Utilities", value: "Utilities" },
  { label: "Supplies", value: "Supplies" },
  { label: "Insurance", value: "Insurance" },
  { label: "Staff", value: "Staff" },
  { label: "Marketing", value: "Marketing" },
  { label: "Administrative Costs", value: "Administrative Costs" },
  { label: "Taxes", value: "Taxes" },
  { label: "Capital Expenditures", value: "Capital Expenditures" },
  { label: "Other", value: "Other" }
];

interface ExpenseTableProps {
  onEdit?: (expense: Expense) => void;
}

export function ExpenseTable({ onEdit }: ExpenseTableProps) {
  const { organizationId, accountId } = useOrganization();

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }

      return data as Expense[];
    },
    enabled: !!organizationId && !!accountId
  });

  const handleDelete = async (expense: Expense) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expense.id)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error("Failed to delete expense");
    }
  };

  const columns: Column<Expense>[] = [
    {
      header: "Description",
      accessorKey: "description"
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (item: Expense) => (
        <span>${item.amount?.toLocaleString()}</span>
      )
    },
    {
      header: "Category",
      accessorKey: "category"
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (item: Expense) => (
        <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: Expense) => (
        <span className="capitalize">{item.status || 'pending'}</span>
      )
    },
    {
      header: "Payment Method",
      accessorKey: "payment_method",
      cell: (item: Expense) => (
        <span className="capitalize">{item.payment_method || 'N/A'}</span>
      )
    }
  ];

  if (error) {
    toast.error("Failed to load expenses. Please try again.");
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={expenses}
          columns={columns}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={handleDelete}
          tableName="expenses"
          filters={[
            {
              name: "category",
              options: expenseCategories,
              value: "all",
              onChange: () => {}
            }
          ]}
          dateRange={{
            startDate: null,
            endDate: null,
            onDateRangeChange: () => {}
          }}
        />
      </div>
    </Card>
  );
}