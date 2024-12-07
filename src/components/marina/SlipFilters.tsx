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
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search slips..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-[#E8EBEB] text-[#133134]"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[180px] border-[#E8EBEB] text-[#133134]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="occupied">Occupied</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>
      <Select value={dockFilter} onValueChange={onDockFilterChange}>
        <SelectTrigger className="w-[180px] border-[#E8EBEB] text-[#133134]">
          <SelectValue placeholder="Filter by dock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Docks</SelectItem>
          {availableDocks.map((dock) => (
            <SelectItem key={dock} value={dock}>
              {dock}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}