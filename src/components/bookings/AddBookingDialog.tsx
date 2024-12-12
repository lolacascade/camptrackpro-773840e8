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
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CustomerSelect } from "./form-fields/CustomerSelect";
import { DateSelect } from "./form-fields/DateSelect";
import { SlotSelect } from "./form-fields/SlotSelect";

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
  const { toast } = useToast();
  const form = useForm({
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

  const onSubmit = async (values: any) => {
    try {
      const bookingData = {
        customer_id: parseInt(values.customerId),
        slot_id: parseInt(values.slotId),
        check_in_date: format(values.checkInDate, "yyyy-MM-dd"),
        check_out_date: format(values.checkOutDate, "yyyy-MM-dd"),
        special_requirements: values.specialRequirements,
        status: "pending",
      };

      const { error } = await supabase.from("bookings").insert([bookingData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking has been created successfully.",
      });

      onBookingAdded();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
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
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Booking
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}