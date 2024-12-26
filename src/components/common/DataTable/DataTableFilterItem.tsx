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
    <Select 
      value={value} 
      onValueChange={(newValue) => {
        console.log('Filter changing in FilterItem:', name, newValue);
        onChange(newValue);
      }}
    >
      <SelectTrigger className="w-[180px] h-11 border-[#E8EBEB] text-[#133134] bg-white">
        <SelectValue placeholder={`All ${name}s`} />
      </SelectTrigger>
      <SelectContent 
        className="bg-white border border-[#E8EBEB] shadow-lg z-[100]"
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