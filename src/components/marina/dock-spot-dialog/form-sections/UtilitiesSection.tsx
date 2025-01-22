import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"
import { DockSpotFormValues } from "../types"

interface UtilitiesSectionProps {
  form: UseFormReturn<DockSpotFormValues>
}

export function UtilitiesSection({ form }: UtilitiesSectionProps) {
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voltage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="30A">30A</SelectItem>
                  <SelectItem value="50A">50A</SelectItem>
                  <SelectItem value="100A">100A</SelectItem>
                </SelectContent>
              </Select>
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  )
}