
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";
import { Expense } from "@/types/expense";
import { Column } from "@/components/common/DataTable/types";
import { format } from "date-fns";
import { useState } from "react";

const expenseCategories = [
  { label: "All Categories", value: "all" },
  { label: "Revenue", value: "Revenue" },
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
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function ExpenseTable({ onEdit, dateRange }: ExpenseTableProps) {
  const { organizationId, accountId } = useOrganization();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: ['expenses', organizationId, accountId, dateRange.from, dateRange.to, selectedCategory],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      let query = supabase
        .from('expenses')
        .select(`
          id,
          description,
          amount,
          category,
          date,
          status,
          payment_method,
          booking_id,
          bookings!expenses_booking_id_fkey (
            reservation_code,
            customers (
              first_name,
              last_name
            )
          )
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .gte('date', format(dateRange.from, 'yyyy-MM-dd'))
        .lte('date', format(dateRange.to, 'yyyy-MM-dd'))
        .order('date', { ascending: false });

      if (selectedCategory !== "all") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }

      return data as Expense[];
    },
    enabled: !!organizationId && !!accountId
  });

  const handleDelete = async (expense: Expense) => {
    if (expense.booking_id) {
      toast.error("Cannot delete expenses linked to bookings");
      return;
    }

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expense.id)
      .eq('organization_id', organizationId)
      .eq('account_id', accountId);

    if (error) {
      toast.error("Failed to delete expense");
      return;
    }

    toast.success("Expense deleted successfully");
  };

  const columns: Column<Expense>[] = [
    {
      header: "Description",
      accessorKey: "description",
      sortable: true,
      cell: (item: Expense) => {
        if (item.bookings) {
          const booking = item.bookings;
          const customer = booking.customers;
          return (
            <div>
              <div>{item.description}</div>
              <div className="text-sm text-gray-500">
                {customer?.first_name} {customer?.last_name}
              </div>
            </div>
          );
        }
        return item.description;
      }
    },
    {
      header: "Amount",
      accessorKey: "amount",
      sortable: true,
      cell: (item: Expense) => (
        <span className={item.category === 'Revenue' ? 'text-green-600' : ''}>
          ${item.amount?.toLocaleString()}
        </span>
      )
    },
    {
      header: "Category",
      accessorKey: "category",
      sortable: true
    },
    {
      header: "Date",
      accessorKey: "date",
      sortable: true,
      cell: (item: Expense) => (
        <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (item: Expense) => (
        <span className="capitalize">{item.status || 'pending'}</span>
      )
    },
    {
      header: "Payment Method",
      accessorKey: "payment_method",
      sortable: true,
      cell: (item: Expense) => (
        <span className="capitalize">{item.payment_method || 'N/A'}</span>
      )
    }
  ];

  if (error) {
    toast.error("Failed to load expenses. Please try again.");
  }

  return (
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
          value: selectedCategory,
          onChange: setSelectedCategory
        }
      ]}
      dateRange={{
        startDate: dateRange.from,
        endDate: dateRange.to,
        onDateRangeChange: () => {}
      }}
    />
  );
}
