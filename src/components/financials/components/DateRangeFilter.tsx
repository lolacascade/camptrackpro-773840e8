
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfMonth } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";

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
            className="w-full justify-start text-left font-normal hover:bg-accent hover:text-accent-foreground cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 z-50" 
          align="start"
          side="bottom"
          sideOffset={8}
          forceMount
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
