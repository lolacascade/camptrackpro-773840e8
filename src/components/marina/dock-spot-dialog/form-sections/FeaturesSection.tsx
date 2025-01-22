import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { DockSpotFormValues } from "../types";

interface FeaturesSectionProps {
  form: UseFormReturn<DockSpotFormValues>;
}

export function FeaturesSection({ form }: FeaturesSectionProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Features</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="is_covered"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Covered Spot</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_water"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Water Access</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}