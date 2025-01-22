import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"
import { DockSpotFormValues } from "../types"
import { SelectField } from "@/components/common/FormFields/SelectField"

interface UtilitiesSectionProps {
  form: UseFormReturn<DockSpotFormValues>
}

export function UtilitiesSection({ form }: UtilitiesSectionProps) {
  const voltageOptions = [
    { label: "30A", value: "30A" },
    { label: "50A", value: "50A" },
    { label: "100A", value: "100A" }
  ]

  const connectionOptions = [
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" },
    { label: "Basic", value: "basic" }
  ]

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Utilities</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="electricity_voltage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Electricity</FormLabel>
              <FormControl>
                <SelectField
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={voltageOptions}
                  placeholder="Select voltage"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="utility_connection_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Utility Connection Type</FormLabel>
              <FormControl>
                <SelectField
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={connectionOptions}
                  placeholder="Select connection type"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}