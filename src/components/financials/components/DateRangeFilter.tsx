import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DateRangeFilterProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-[280px] justify-start text-left font-normal bg-white",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate: any) => {
              setDate(newDate);
              if (newDate?.from && newDate?.to) {
                onDateRangeChange(newDate);
              }
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}