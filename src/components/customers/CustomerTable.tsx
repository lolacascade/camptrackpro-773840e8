import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getCustomerColumns } from "./table/CustomerTableColumns";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ onEdit }: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();

  const fetchCustomers = async () => {
    if (!organizationId || !accountId) return;
    
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);
      
      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId && accountId) {
      fetchCustomers();
    }
  }, [organizationId, accountId]);

  const handleDelete = async (customer: Customer) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id as string);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
      fetchCustomers();
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