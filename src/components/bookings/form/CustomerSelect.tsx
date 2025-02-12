
import { Customer } from "@/types/customer";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { useQueryClient } from "@tanstack/react-query";

interface CustomerSelectProps {
  value: string;
  onSelect: (customerId: string) => void;
  customers: Customer[];
  onCustomerCreated: (customer: Customer) => void;
}

export function CustomerSelect({ value, onSelect, customers, onCustomerCreated }: CustomerSelectProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const options = customers.map(customer => ({
    value: String(customer.id),
    label: `${customer.first_name} ${customer.last_name}`
  }));

  const handleCustomerCreated = (customer: Customer) => {
    // Update the local state and form
    onCustomerCreated(customer);
    // Invalidate the customers query to trigger a refresh
    queryClient.invalidateQueries({ queryKey: ['customers'] });
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Select Customer</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          New Customer
        </Button>
      </div>
      <SelectField
        value={value}
        onChange={onSelect}
        options={options}
        placeholder="Select customer"
      />
      <CustomerDrawer
        customer={null}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCustomerUpdated={handleCustomerCreated}
      />
    </div>
  );
}
