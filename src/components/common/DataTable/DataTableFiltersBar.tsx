import { DataTableFilterItem } from "./DataTableFilterItem";

interface FilterOption {
  label: string;
  value: string;
}

interface Filter {
  name: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface DataTableFiltersBarProps {
  filters: Filter[];
}

export function DataTableFiltersBar({ filters }: DataTableFiltersBarProps) {
  if (!filters.length) return null;

  return (
    <div className="flex items-center gap-4">
      {filters.map((filter) => (
        <DataTableFilterItem
          key={filter.name}
          name={filter.name}
          options={filter.options}
          value={filter.value}
          onChange={filter.onChange}
        />
      ))}
    </div>
  );
}