import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataTableFiltersBar } from "./DataTableFiltersBar";
import { DataTableColumns } from "./DataTableColumns";
import { DatePickerField } from "@/components/common/FormFields/DatePickerField";

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
  dateRange?: {
    startDate: Date | null;
    endDate: Date | null;
    onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  };
}

export function DataTableHeader({ 
  searchTerm, 
  onSearchChange,
  title,
  filters = [],
  showTodayOnly,
  onShowTodayChange,
  columns,
  onColumnVisibilityChange,
  dateRange
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
        
        {dateRange && (
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border">
            <DatePickerField
              value={dateRange.startDate}
              onChange={(date) => dateRange.onDateRangeChange(date, dateRange.endDate)}
              placeholder="Start Date"
              className="w-40"
            />
            <span className="text-gray-500">to</span>
            <DatePickerField
              value={dateRange.endDate}
              onChange={(date) => dateRange.onDateRangeChange(dateRange.startDate, date)}
              placeholder="End Date"
              className="w-40"
            />
          </div>
        )}
        
        <DataTableFiltersBar filters={filteredFilters} />
        <DataTableColumns 
          columns={columns}
          onColumnVisibilityChange={onColumnVisibilityChange}
        />
        {onShowTodayChange && (
          <div className="flex items-center gap-4">
            <Switch
              id="show-today"
              checked={showTodayOnly}
              onCheckedChange={onShowTodayChange}
            />
            <Label htmlFor="show-today" className="text-base font-medium">Today only</Label>
          </div>
        )}
      </div>
    </div>
  );
}