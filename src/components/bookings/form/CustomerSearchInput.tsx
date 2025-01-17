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
  onCustomerSelect: (customerId: number) => void;
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
        value={selectedCustomer?.id.toString()}
        onValueChange={(value) => onCustomerSelect(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a customer" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id.toString()}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}