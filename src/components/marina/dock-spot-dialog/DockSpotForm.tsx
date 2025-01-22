import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Dock spot name must be at least 2 characters.",
  }),
  length_ft: z.number().min(1, "Length must be greater than 0"),
  width_ft: z.number().min(1, "Width must be greater than 0"),
  is_covered: z.boolean().default(false),
  electricity_voltage: z.string().optional(),
  has_water: z.boolean().default(false),
  status: z.enum(['available', 'occupied', 'maintenance']).default('available'),
});

export type DockSpotFormValues = z.infer<typeof formSchema>;

interface DockSpotFormProps {
  onSubmit: (values: DockSpotFormValues) => void;
  defaultValues?: Partial<DockSpotFormValues>;
}

export function DockSpotForm({ onSubmit, defaultValues }: DockSpotFormProps) {
  const form = useForm<DockSpotFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      length_ft: 0,
      width_ft: 0,
      is_covered: false,
      has_water: false,
      status: 'available',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dock Spot Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A1, B2..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="length_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="width_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <FormLabel>Covered Slip</FormLabel>
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
        <Button type="submit" className="w-full">
          Create Dock Spot
        </Button>
      </form>
    </Form>
  );
}