import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  id?: string
  label?: string
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  tabIndex?: number
  className?: string
  disabled?: boolean
}

export function FormSelect({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select option",
  tabIndex,
  className,
  disabled
}: FormSelectProps) {
  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          tabIndex={tabIndex}
          disabled={disabled}
          className={cn(
            "w-full h-10 px-3 rounded-md border border-input bg-white text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              className="py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}