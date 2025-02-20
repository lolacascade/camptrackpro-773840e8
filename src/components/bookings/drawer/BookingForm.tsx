
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookingDateRange } from "../form/BookingDateRange";
import { DateRange } from "react-day-picker";

interface BookingFormProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export function BookingForm({ dateRange, onDateRangeChange }: BookingFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter booking title" />
      </div>
      
      <BookingDateRange 
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
    </div>
  );
}
