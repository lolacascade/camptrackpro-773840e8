import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CustomerSelect } from "./form-fields/CustomerSelect";
import { DateSelect } from "./form-fields/DateSelect";
import { SlotSelect } from "./form-fields/SlotSelect";
import { useCreateBooking } from "@/hooks/bookings/use-create-booking";
import { BookingFormValues } from "@/types/bookings";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bookingFormSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  slotId: z.string().min(1, "Please select a slot"),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  specialRequirements: z.string().optional(),
});

interface AddBookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingAdded: () => void;
}

export function AddBookingDialog({
  isOpen,
  onOpenChange,
  onBookingAdded,
}: AddBookingDialogProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      customerId: "",
      slotId: "",
      checkInDate: new Date(),
      checkOutDate: new Date(),
      specialRequirements: "",
    },
  });

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email");
      if (error) throw error;
      return data;
    },
  });

  const { data: availableSlots } = useQuery({
    queryKey: ["available-slots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slots")
        .select("id, name")
        .eq("status", "available");
      if (error) throw error;
      return data;
    },
  });

  const { createBooking, isLoading } = useCreateBooking(() => {
    onBookingAdded();
    onOpenChange(false);
    form.reset();
  });

  const onSubmit = (data: BookingFormValues) => {
    createBooking(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomerSelect form={form} customers={customers} />
            <SlotSelect form={form} availableSlots={availableSlots} />
            <DateSelect
              form={form}
              name="checkInDate"
              label="Check-in Date"
            />
            <DateSelect
              form={form}
              name="checkOutDate"
              label="Check-out Date"
              minDate={form.getValues("checkInDate")}
            />
            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any special requirements..."
                      {...field}
                      className="bg-white resize-none min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Booking"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}