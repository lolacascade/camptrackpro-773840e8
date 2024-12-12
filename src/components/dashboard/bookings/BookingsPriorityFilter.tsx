import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingsPriorityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function BookingsPriorityFilter({ value, onChange }: BookingsPriorityFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Priorities</SelectItem>
        <SelectItem value="high">High Priority</SelectItem>
        <SelectItem value="medium">Medium Priority</SelectItem>
        <SelectItem value="low">Low Priority</SelectItem>
      </SelectContent>
    </Select>
  );
}