import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dockFilter: string;
  onDockFilterChange: (value: string) => void;
  availableDocks: string[];
}

export function DashboardFilters({
  searchQuery,
  onSearchChange,
  dockFilter,
  onDockFilterChange,
  availableDocks,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search slips..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-[200px]"
      />
      
      <Select value={dockFilter} onValueChange={onDockFilterChange}>
        <SelectTrigger className="sm:max-w-[200px]">
          <SelectValue placeholder="Filter by dock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Docks</SelectItem>
          {availableDocks.map((dock) => (
            <SelectItem key={dock} value={dock}>
              Dock {dock}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}