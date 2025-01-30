import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    <input
      type="date"
      value={value ? format(value, "yyyy-MM-dd") : ""}
      onChange={(e) => {
        const date = e.target.value ? new Date(e.target.value) : undefined;
        onChange(date);
      }}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      placeholder={placeholder}
    />
  );
}