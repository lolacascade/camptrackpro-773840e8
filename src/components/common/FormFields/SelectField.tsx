import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className,
}: SelectFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger 
        className={`w-[180px] h-11 border-[#E8EBEB] text-[#133134] bg-white ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className="bg-white border border-[#E8EBEB] shadow-lg"
        position="popper"
        sideOffset={5}
        align="start"
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer hover:bg-gray-100 py-2 px-4"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}