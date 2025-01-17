import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormSelect } from "@/components/common/FormSelect";
import { Customer } from "@/types/customer";

interface CustomerSelectProps {
  selectedCustomerId: number | null;
  onCustomerSelect: (customerId: number | null) => void;
}

export function CustomerSelect({ selectedCustomerId, onCustomerSelect }: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCustomers(data || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const customerOptions = customers.map(customer => ({
    value: customer.id.toString(),
    label: customer.name
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Customer</Label>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <FormSelect
        value={selectedCustomerId?.toString() || ''}
        onValueChange={(value) => onCustomerSelect(value ? parseInt(value) : null)}
        options={customerOptions}
        placeholder="Select a customer"
      />
    </div>
  );
}