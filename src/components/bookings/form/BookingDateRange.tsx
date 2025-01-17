import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { DateRange as DateRangeType } from "react-day-picker"

interface BookingDateRangeProps {
  dateRange: DateRangeType | undefined;
  onDateRangeChange: (range: DateRangeType | undefined) => void;
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