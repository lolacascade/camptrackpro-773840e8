import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormSelect } from "@/components/common/FormSelect"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { FormField } from "./types"

export function EntityField({ field }: { field: FormField }) {
  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <FormSelect
            value={field.value?.toString() || ''}
            onValueChange={field.onChange}
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
          <div className="relative">
            <Input
              type="date"
              value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ''}
              onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
              className="bg-white"
            />
          </div>
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