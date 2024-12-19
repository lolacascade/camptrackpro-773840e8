import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  id: string
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder: string
}

export function FormSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder
}: FormSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className="w-full bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className="bg-white border border-gray-200 shadow-lg z-[100]"
        position="popper"
        sideOffset={5}
      >
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-gray-100 cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}