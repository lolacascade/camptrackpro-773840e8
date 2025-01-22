import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/common/FormFields/SelectField";

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
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const dockOptions = [
    { value: 'all', label: 'All Docks' },
    ...availableDocks.map(dock => ({
      value: dock,
      label: dock
    }))
  ];

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
      <SelectField
        value={statusFilter}
        onChange={onStatusFilterChange}
        options={statusOptions}
        placeholder="Filter by status"
        className="w-[180px]"
      />
      <SelectField
        value={dockFilter}
        onChange={onDockFilterChange}
        options={dockOptions}
        placeholder="Filter by dock"
        className="w-[180px]"
      />
    </div>
  );
}