import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePickerField({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[180px] h-11 justify-start text-left font-normal bg-white border-[#E8EBEB] text-[#133134]",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white border border-[#E8EBEB] shadow-lg" 
        align="start"
        sideOffset={5}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}