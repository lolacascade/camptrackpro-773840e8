import { SelectField } from "../FormFields/SelectField";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableFilterItemProps {
  name: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function DataTableFilterItem({
  name,
  options,
  value,
  onChange,
}: DataTableFilterItemProps) {
  return (
    <SelectField
      value={value}
      onChange={(newValue) => {
        console.log('Filter changing in FilterItem:', name, newValue);
        onChange(newValue);
      }}
      options={options}
      placeholder={`All ${name}s`}
      name={name}
    />
  );
}