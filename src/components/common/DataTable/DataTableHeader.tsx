
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableFiltersBar } from "./DataTableFiltersBar";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  title?: string;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function DataTableHeader({ 
  searchTerm, 
  onSearchChange,
  title,
  filters = [],
}: DataTableHeaderProps) {
  const filteredFilters = filters.filter(filter => filter.name !== 'customer');

  return (
    <div className="flex flex-col gap-6 mb-6">
      {title && (
        <h1 className="text-3xl font-semibold text-[#133134]">{title}</h1>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-white h-11 text-base"
          />
        </div>
        
        <DataTableFiltersBar filters={filteredFilters} />
      </div>
    </div>
  );
}
