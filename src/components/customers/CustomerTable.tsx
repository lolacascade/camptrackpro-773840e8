import { Customer } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getCustomerColumns } from "./table/CustomerTableColumns";
import { useCustomers } from "@/components/bookings/form/useCustomers";
import { supabase } from "@/integrations/supabase/client";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ onEdit }: CustomerTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { customers, isLoading } = useCustomers();

  const handleViewDetails = (customer: Customer) => {
    navigate(`/app/customers/${String(customer.id)}`);
  };

  const handleDelete = async (customer: Customer) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={customers}
          columns={getCustomerColumns()}
          tableName="customers"
          onViewDetails={handleViewDetails}
          onEdit={onEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
}