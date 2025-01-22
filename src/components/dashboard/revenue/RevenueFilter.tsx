import { SelectField } from "@/components/common/FormFields/SelectField";
import { RevenueCategory } from "./types";

interface RevenueFilterProps {
  value: RevenueCategory;
  onChange: (value: RevenueCategory) => void;
}

export function RevenueFilter({ value, onChange }: RevenueFilterProps) {
  const options = [
    { value: 'all', label: 'All Categories' },
    { value: 'renewals', label: 'Slip Renewals' },
    { value: 'new_rentals', label: 'New Rentals' },
    { value: 'maintenance', label: 'Maintenance Services' }
  ];

  return (
    <SelectField
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Filter by category"
      className="w-[200px]"
    />
  );
}