import { useCustomers } from "./useCustomers";
import { CustomerSearchInput } from "./CustomerSearchInput";

interface CustomerSelectProps {
  selectedCustomerId: string | null;
  onCustomerSelect: (customerId: string | null) => void;
}

export function CustomerSelect({ 
  selectedCustomerId, 
  onCustomerSelect 
}: CustomerSelectProps) {
  const { customers, isLoading } = useCustomers();
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <CustomerSearchInput
      isLoading={isLoading}
      customers={customers}
      selectedCustomer={selectedCustomer}
      onCustomerSelect={onCustomerSelect}
    />
  );
}