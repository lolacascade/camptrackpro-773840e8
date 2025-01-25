import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";
import { Expense } from "@/types/expense";
import { Column } from "@/components/common/DataTable/types";

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

  if (error) {
    toast.error("Failed to load expenses. Please try again.");
  }

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
        <span>{new Date(item.date).toLocaleDateString()}</span>
      )
    }
  ];

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={expenses}
          columns={columns}
          isLoading={isLoading}
          onRowClick={onEdit}
          tableName="expenses"
        />
      </div>
    </Card>
  );
}