import { Customer } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getCustomerColumns } from "./table/CustomerTableColumns";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ customers, onEdit }: CustomerTableProps) {
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

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={localCustomers}
          columns={getCustomerColumns(onEdit)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tableName="customers"
        />
      </div>
    </Card>
  );
}