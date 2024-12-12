import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableFiltersProps {
  filters: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function DataTableFilters({ filters }: DataTableFiltersProps) {
  if (!filters.length) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {filters.map((filter) => (
        <Select
          key={filter.name}
          value={filter.value}
          onValueChange={filter.onChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Filter by ${filter.name}`} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}