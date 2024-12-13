import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataTableFiltersBar } from "./DataTableFiltersBar";
import { DataTableColumns } from "./DataTableColumns";

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
  showTodayOnly?: boolean;
  onShowTodayChange?: (checked: boolean) => void;
  columns: any[];
  onColumnVisibilityChange: (columns: string[]) => void;
}

export function DataTableHeader({ 
  searchTerm, 
  onSearchChange,
  title,
  filters = [],
  showTodayOnly,
  onShowTodayChange,
  columns,
  onColumnVisibilityChange
}: DataTableHeaderProps) {
  // Filter out the customer filter
  const filteredFilters = filters.filter(filter => filter.name !== 'customer');

  return (
    <div className="flex flex-col gap-6 mb-6">
      {title && (
        <h1 className="text-3xl font-semibold text-[#133134]">{title}</h1>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 bg-white"
              />
            </div>
            {onShowTodayChange && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-today"
                  checked={showTodayOnly}
                  onCheckedChange={onShowTodayChange}
                />
                <Label htmlFor="show-today">Today only</Label>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DataTableFiltersBar filters={filteredFilters} />
            <DataTableColumns 
              columns={columns}
              onColumnVisibilityChange={onColumnVisibilityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}