import { DateRange, Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface BookingDateRangeProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function BookingDateRange({ dateRange, onDateRangeChange }: BookingDateRangeProps) {
  return (
    <div className="space-y-2">
      <Label>Booking Period</Label>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={onDateRangeChange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    </div>
  );
}