
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface DateRangeFilterProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date()
  });

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    // Only trigger the parent callback when we have both dates
    if (newDate?.from && newDate?.to) {
      onDateRangeChange({
        from: newDate.from,
        to: newDate.to
      });
    }
  };

  return (
    <div className="w-full sm:w-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white"
          >
            {date?.from
              ? date.to
                ? `${format(date.from, "LLL dd, y")} - ${format(
                    date.to,
                    "LLL dd, y"
                  )}`
                : format(date.from, "LLL dd, y")
              : "Pick a date range"}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Date Range</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from || new Date()}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              className="rounded-md border"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
