import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectField } from "@/components/common/FormFields/SelectField"
import { DatePickerField } from "@/components/common/FormFields/DatePickerField"
import type { FormField } from "./types"

export function EntityField({ field }: { field: FormField }) {
  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <SelectField
            value={field.value?.toString() || ''}
            onChange={field.onChange}
            options={field.options || []}
            placeholder={`Select ${field.label.toLowerCase()}`}
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            value={field.value?.toString() || ''}
            onChange={(e) => field.onChange(parseFloat(e.target.value))}
            className="bg-white"
          />
        )
      case 'date':
        return (
          <DatePickerField
            value={field.value ? new Date(field.value) : undefined}
            onChange={(date) => field.onChange(date?.toISOString())}
            placeholder={`Select ${field.label.toLowerCase()}`}
            className="w-full"
          />
        )
      default:
        return (
          <Input
            value={field.value?.toString() || ''}
            onChange={(e) => field.onChange(e.target.value)}
            className="bg-white"
          />
        )
    }
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>
        {field.label} {field.required && '*'}
      </Label>
      {renderField()}
    </div>
  )
}