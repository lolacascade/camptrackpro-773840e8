
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Booking, BookingStatus } from "@/types/booking";
import { DateRange } from "react-day-picker";
import { BookingDateRange } from "../form/BookingDateRange";

interface BookingFormFieldsProps {
  booking: Partial<Booking>;
  setBooking: (booking: Partial<Booking>) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export function BookingFormFields({ 
  booking, 
  setBooking,
  dateRange,
  setDateRange
}: BookingFormFieldsProps) {
  const statuses: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed', 'checked_in'];

  return (
    <div className="space-y-4">
      <BookingDateRange
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div>
        <Label>Status</Label>
        <Select
          value={booking.status || 'pending'}
          onValueChange={(value: BookingStatus) => setBooking({ ...booking, status: value })}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Special Requirements</Label>
        <Input
          value={booking.special_requirements || ''}
          onChange={(e) => setBooking({ ...booking, special_requirements: e.target.value })}
          placeholder="Enter any special requirements"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Total Amount</Label>
        <Input
          type="number"
          value={booking.total_amount || ''}
          onChange={(e) => setBooking({ ...booking, total_amount: parseFloat(e.target.value) || null })}
          placeholder="Enter total amount"
          className="bg-white"
        />
      </div>
    </div>
  );
}
