import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField } from "./types"

export function EntityField({ field }: { field: FormField }) {
  const renderField = () => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            value={field.value || ''}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'number':
        return (
          <Input
            type="number"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
          />
        )
      case 'date':
        return (
          <Input
            type="date"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )
      default:
        return (
          <Input
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
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