import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableFilters } from "./DataTableFilters";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  title?: string;
  children?: React.ReactNode;
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
  children,
  filters = []
}: DataTableHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {title && (
        <h2 className="text-2xl font-bold text-[#133134]">{title}</h2>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          {children}
        </div>
        <DataTableFilters filters={filters} />
      </div>
    </div>
  );
}