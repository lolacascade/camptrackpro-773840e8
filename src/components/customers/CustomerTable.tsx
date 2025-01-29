import { Customer } from "@/types/customer";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getCustomerColumns } from "./table/CustomerTableColumns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCustomers } from "@/components/bookings/form/useCustomers";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ onEdit }: CustomerTableProps) {
  const { customers, isLoading } = useCustomers();

  const handleDelete = async (customer: Customer) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id);

      if (error) throw error;
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error("Failed to delete customer");
    }
  };

  return (
    <DataTable
      data={customers}
      columns={getCustomerColumns()}
      onEdit={onEdit}
      onDelete={handleDelete}
      isLoading={isLoading}
      tableName="customers"
    />
  );
}