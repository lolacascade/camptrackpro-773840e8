
import { DatePickerField } from "@/components/common/FormFields/DatePickerField";
import { Label } from "@/components/ui/label";

interface BookingDateRangeProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
}

export function BookingDateRange({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange
}: BookingDateRangeProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Check-in Date</Label>
        <DatePickerField
          value={checkIn ? new Date(checkIn) : new Date()}
          onChange={(date) => onCheckInChange(date?.toISOString() || '')}
        />
      </div>
      <div>
        <Label>Check-out Date</Label>
        <DatePickerField
          value={checkOut ? new Date(checkOut) : new Date()}
          onChange={(date) => onCheckOutChange(date?.toISOString() || '')}
          minDate={checkIn ? new Date(checkIn) : new Date()}
        />
      </div>
    </div>
  );
}
