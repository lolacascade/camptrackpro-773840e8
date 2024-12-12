import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface CustomerSelectProps {
  form: UseFormReturn<any>;
  customers?: { id: number; name: string; email: string }[];
}

export function CustomerSelect({ form, customers }: CustomerSelectProps) {
  return (
    <FormField
      control={form.control}
      name="customerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Customer</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {customers?.map((customer) => (
                <SelectItem key={customer.id} value={String(customer.id)}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}