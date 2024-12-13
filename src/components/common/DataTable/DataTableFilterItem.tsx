import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableFilterItemProps {
  name: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function DataTableFilterItem({
  name,
  options,
  value,
  onChange,
}: DataTableFilterItemProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] h-11 border-[#E8EBEB] text-[#133134] bg-white">
        <SelectValue placeholder={`All ${name}s`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}