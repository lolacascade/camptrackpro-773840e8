import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BookingsListFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BookingsListFilters({ searchTerm, onSearchChange }: BookingsListFiltersProps) {
  return (
    <div className="p-4 border-b border-[#E8EBEB]">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3E4238] h-4 w-4" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}