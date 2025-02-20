
import { Label } from "@/components/ui/label";
import { DatePickerField } from "@/components/common/FormFields/DatePickerField";
import { DateRange } from "react-day-picker";

interface BookingDateRangeProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function BookingDateRange({
  dateRange,
  onDateRangeChange
}: BookingDateRangeProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Check-in Date</Label>
        <DatePickerField
          value={dateRange?.from ? new Date(dateRange.from) : new Date()}
          onChange={(date) => onDateRangeChange(date ? {
            from: date,
            to: dateRange?.to || date
          } : undefined)}
        />
      </div>
      <div>
        <Label>Check-out Date</Label>
        <DatePickerField
          value={dateRange?.to ? new Date(dateRange.to) : new Date()}
          onChange={(date) => onDateRangeChange(date ? {
            from: dateRange?.from || date,
            to: date
          } : undefined)}
        />
      </div>
    </div>
  );
}
