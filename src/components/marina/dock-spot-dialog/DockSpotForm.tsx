import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Spot name must be at least 2 characters.",
  }),
  dock: z.string().optional(),
  zone: z.string().optional(),
  length_ft: z.number().optional(),
  width_ft: z.number().optional(),
  is_covered: z.boolean().default(false),
  has_water: z.boolean().default(false),
  electricity_voltage: z.string().optional(),
  utility_connection_type: z.string().optional(),
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
      dock: '',
      zone: '',
      length_ft: undefined,
      width_ft: undefined,
      is_covered: false,
      has_water: false,
      electricity_voltage: '',
      utility_connection_type: '',
      status: 'available',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spot Name *</FormLabel>
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
                name="dock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dock</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., North, A..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1, West..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value || ''}
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
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Utilities */}
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

        {/* Features */}
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

        <Button type="submit" className="w-full">
          Create Spot
        </Button>
      </form>
    </Form>
  );
}