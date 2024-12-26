import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  name?: string;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className,
  name,
}: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        className={cn(
          "w-full h-11 px-3 py-2 rounded-md border border-[#E8EBEB] bg-white text-[#133134]",
          "appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C0CCAB]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="py-2"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-[#133134] opacity-50" />
    </div>
  );
}