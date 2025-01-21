import { Customer } from "@/types/customer";
import { SelectField } from "@/components/common/FormFields/SelectField";

interface CustomerSelectProps {
  value: string;
  onSelect: (customerId: string) => void;
  customers: Customer[];
}

export function CustomerSelect({ value, onSelect, customers }: CustomerSelectProps) {
  const options = customers.map(customer => ({
    value: customer.id,
    label: `${customer.first_name} ${customer.last_name}`
  }));

  return (
    <SelectField
      value={value}
      onChange={onSelect}
      options={options}
      placeholder="Select customer"
    />
  );
}