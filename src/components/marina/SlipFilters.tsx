import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SlipFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dockFilter: string;
  onDockFilterChange: (value: string) => void;
  availableDocks: string[];
}

export function SlipFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  dockFilter,
  onDockFilterChange,
  availableDocks,
}: SlipFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search slips..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-[200px]"
      />
      
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="sm:max-w-[200px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="occupied">Occupied</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>

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