import { cn } from "@/lib/utils";

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
        <div key={filter.name} className="relative min-w-[180px]">
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className={cn(
              "w-full h-10 px-3 rounded-md border border-[#E8EBEB] bg-white text-sm text-[#133134]",
              "focus:outline-none focus:ring-2 focus:ring-[#C0CCAB] focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <option value="">{`Filter by ${filter.name}`}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-[#133134] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}