import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BoatTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function BoatTableHeader({ searchTerm, onSearchChange }: BoatTableHeaderProps) {
  return (
    <div className="mb-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search boats..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
}