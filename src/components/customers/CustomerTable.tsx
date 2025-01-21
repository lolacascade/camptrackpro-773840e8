import { Customer } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCustomerColumns } from "./table/CustomerTableColumns";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ customers: initialCustomers, onEdit }: CustomerTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [localCustomers, setLocalCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('first_name', { ascending: true });

      if (error) throw error;
      setLocalCustomers(data || []);
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
    fetchCustomers();

    // Set up real-time subscription
    const subscription = supabase
      .channel('customers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'customers'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchCustomers(); // Refresh the data when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleViewDetails = (customer: Customer) => {
    navigate(`/app/customers/${customer.id}`);
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
          data={localCustomers}
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