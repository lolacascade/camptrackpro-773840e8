import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { DataTable } from "@/components/common/DataTable/DataTable";

interface NotesTabProps {
  customer: Customer;
}

export function NotesTab({ customer }: NotesTabProps) {
  const { data: notes, isLoading } = useQuery({
    queryKey: ['customer-notes', customer.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_notes')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const columns = [
    {
      header: "Note",
      accessorKey: "note",
    },
    {
      header: "Tag",
      accessorKey: "tag",
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: (row: any) => new Date(row.created_at).toLocaleDateString(),
    }
  ];

  return (
    <DataTable
      data={notes || []}
      columns={columns}
      isLoading={isLoading}
      tableName="customer-notes"
    />
  );
}