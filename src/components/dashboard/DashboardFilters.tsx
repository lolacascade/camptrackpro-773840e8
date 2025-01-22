import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/common/FormFields/SelectField";

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
  const dockOptions = [
    { value: 'all', label: 'All Docks' },
    ...availableDocks.map(dock => ({
      value: dock,
      label: `Dock ${dock}`
    }))
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search slips..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-[200px]"
      />
      
      <SelectField
        value={dockFilter}
        onChange={onDockFilterChange}
        options={dockOptions}
        placeholder="Filter by dock"
        className="sm:max-w-[200px]"
      />
    </div>
  );
}