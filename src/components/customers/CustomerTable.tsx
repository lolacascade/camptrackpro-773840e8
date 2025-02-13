
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
    if (!customer.id) {
      toast.error("Invalid customer ID");
      return;
    }

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id.toString());

      if (error) {
        toast.error(error.message || "Failed to delete customer");
        return;
      }

      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const handleViewDetails = (customer: Customer) => {
    onEdit(customer);
  };

  return (
    <DataTable
      data={customers}
      columns={getCustomerColumns()}
      onEdit={onEdit}
      onViewDetails={handleViewDetails}
      onDelete={handleDelete}
      isLoading={isLoading}
      tableName="customers"
      title="Customers"
    />
  );
}
