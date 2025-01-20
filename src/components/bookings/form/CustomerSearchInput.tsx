import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer } from "@/types/customer";

interface CustomerSearchInputProps {
  isLoading: boolean;
  customers: Customer[];
  selectedCustomer: Customer | undefined;
  onCustomerSelect: (customerId: string) => void;
}

export function CustomerSearchInput({
  isLoading,
  customers,
  selectedCustomer,
  onCustomerSelect,
}: CustomerSearchInputProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Customer</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Loading customers..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Customer</Label>
      <Select
        value={selectedCustomer?.id}
        onValueChange={onCustomerSelect}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a customer" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {`${customer.first_name} ${customer.last_name}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}