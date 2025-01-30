import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, subDays, startOfYear, subYears } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check } from "lucide-react";

export type DatePreset = 'this-month' | 'last-30-days' | 'previous-month' | '2024' | 'ytd' | 'all' | 'custom';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeFilterProps {
  onDateRangeChange: (range: DateRange) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [date, setDate] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<DatePreset>('this-month');

  const presets = [
    {
      id: 'this-month' as DatePreset,
      label: 'This Mo',
      getRange: () => ({
        from: startOfMonth(new Date()),
        to: new Date(),
      }),
    },
    {
      id: 'last-30-days' as DatePreset,
      label: 'Last 30D',
      getRange: () => ({
        from: subDays(new Date(), 30),
        to: new Date(),
      }),
    },
    {
      id: 'previous-month' as DatePreset,
      label: 'Prev Mo',
      getRange: () => {
        const today = new Date();
        const firstDayPrevMonth = startOfMonth(subDays(today, today.getDate()));
        return {
          from: firstDayPrevMonth,
          to: endOfMonth(firstDayPrevMonth),
        };
      },
    },
    {
      id: '2024' as DatePreset,
      label: '2024',
      getRange: () => {
        const year2024 = new Date(2024, 0, 1); // January 1, 2024
        return {
          from: startOfYear(year2024),
          to: endOfMonth(new Date(2024, 11, 31)), // December 31, 2024
        };
      },
    },
    {
      id: 'ytd' as DatePreset,
      label: 'YTD',
      getRange: () => ({
        from: startOfYear(new Date()),
        to: new Date(),
      }),
    },
    {
      id: 'all' as DatePreset,
      label: 'ALL',
      getRange: () => ({
        from: new Date(2020, 0, 1), // Start from 2020
        to: new Date(2024, 11, 31), // End of 2024
      }),
    },
  ];

  const handlePresetClick = (preset: DatePreset) => {
    const selectedPreset = presets.find(p => p.id === preset);
    if (selectedPreset) {
      const newRange = selectedPreset.getRange();
      setDate(newRange);
      setActivePreset(preset);
      onDateRangeChange(newRange);
    }
  };

  const handleCustomDateSelect = (range: DateRange) => {
    if (range.from && range.to) {
      setDate(range);
      setActivePreset('custom');
      onDateRangeChange(range);
      setIsOpen(false);
    }
  };

  // Initialize with "This Month" on component mount
  useEffect(() => {
    handlePresetClick('this-month');
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.id}
            variant={activePreset === preset.id ? "default" : "outline"}
            className="h-9"
            onClick={() => handlePresetClick(preset.id)}
          >
            {activePreset === preset.id && (
              <Check className="mr-2 h-4 w-4" />
            )}
            {preset.label}
          </Button>
        ))}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={activePreset === 'custom' ? "default" : "outline"}
            className={cn(
              "justify-start text-left font-normal h-9",
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
              <span>Custom Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range: DateRange | undefined) => {
              if (range) handleCustomDateSelect(range);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}