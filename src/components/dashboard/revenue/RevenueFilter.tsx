import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RevenueCategory } from "./types";

interface RevenueFilterProps {
  value: RevenueCategory;
  onChange: (value: RevenueCategory) => void;
}

export function RevenueFilter({ value, onChange }: RevenueFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="renewals">Slip Renewals</SelectItem>
        <SelectItem value="new_rentals">New Rentals</SelectItem>
        <SelectItem value="maintenance">Maintenance Services</SelectItem>
      </SelectContent>
    </Select>
  );
}