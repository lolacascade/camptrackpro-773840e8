import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataTableSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function DataTableSearch({ searchTerm, onSearchChange }: DataTableSearchProps) {
  return (
    <div className="relative w-48">
      <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 bg-white h-11 text-base"
      />
    </div>
  );
}