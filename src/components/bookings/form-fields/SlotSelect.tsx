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

interface SlotSelectProps {
  form: UseFormReturn<any>;
  availableSlots?: { id: number; name: string }[];
}

export function SlotSelect({ form, availableSlots }: SlotSelectProps) {
  return (
    <FormField
      control={form.control}
      name="slotId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Slot</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select slot" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableSlots?.map((slot) => (
                <SelectItem key={slot.id} value={String(slot.id)}>
                  {slot.name}
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