
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";

interface DateRangeFilterProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  // Initialize with current month range
  const [date, setDate] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date()
  });

  return (
    <div className="w-full sm:w-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Input
            value={
              date?.from
                ? date.to
                  ? `${format(date.from, "LLL dd, y")} - ${format(
                      date.to,
                      "LLL dd, y"
                    )}`
                  : format(date.from, "LLL dd, y")
                : "Pick a date range"
            }
            readOnly
            className="w-full justify-start text-left font-normal hover:bg-accent hover:text-accent-foreground"
          />
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={(newDate: DateRange | undefined) => {
              // Only update if we have both dates
              if (newDate?.from && newDate?.to) {
                setDate(newDate);
                onDateRangeChange({
                  from: newDate.from,
                  to: newDate.to
                });
              } else if (newDate) {
                // Update local state for partial selection
                setDate(newDate);
              }
            }}
            numberOfMonths={1}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
