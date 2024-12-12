import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookingFormValues } from "@/types/bookings";
import { format } from "date-fns";

type CreateBookingData = {
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: 'pending';
};

export function useCreateBooking(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createBooking = async (values: BookingFormValues) => {
    try {
      setIsLoading(true);
      
      const bookingData: CreateBookingData = {
        customer_id: parseInt(values.customerId),
        slot_id: parseInt(values.slotId),
        check_in_date: format(values.checkInDate, "yyyy-MM-dd"),
        check_out_date: format(values.checkOutDate, "yyyy-MM-dd"),
        special_requirements: values.specialRequirements || null,
        status: "pending"
      };

      const { error } = await supabase
        .from("bookings")
        .insert(bookingData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking has been created successfully.",
      });

      onSuccess();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createBooking, isLoading };
}