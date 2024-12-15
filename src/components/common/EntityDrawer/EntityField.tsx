import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { NumericFormat } from 'react-number-format'
import { cn } from "@/lib/utils"
import type { FormField } from "./types"

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
          <NumericFormat
            customInput={Input}
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale
            prefix="$"
            value={field.value || ''}
            onValueChange={(values) => field.onChange(values.floatValue)}
          />
        )
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                initialFocus
                defaultMonth={new Date()}
              />
            </PopoverContent>
          </Popover>
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