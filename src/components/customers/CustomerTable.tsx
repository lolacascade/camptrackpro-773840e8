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

export function CustomerTable({ customers, onEdit }: CustomerTableProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [localCustomers, setLocalCustomers] = useState<Customer[]>(customers);

  useEffect(() => {
    const subscription = supabase
      .channel('customers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'customers'
        },
        async (payload) => {
          console.log('Change received!', payload);
          const { data: freshCustomers } = await supabase
            .from('customers')
            .select('*')
            .order('name');
          if (freshCustomers) {
            setLocalCustomers(freshCustomers);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLocalCustomers(customers);
  }, [customers]);

  const handleViewDetails = (customer: Customer) => {
    navigate(`/customers/${customer.id}`);
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
          columns={getCustomerColumns(onEdit)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tableName="customers"
          onViewDetails={handleViewDetails}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
}