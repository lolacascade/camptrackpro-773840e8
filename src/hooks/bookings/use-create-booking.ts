import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookingFormValues, BookingInsertData } from "@/types/bookings";
import { useToast } from "@/hooks/use-toast";

export const useCreateBooking = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createBooking = async (formData: BookingFormValues) => {
    setIsLoading(true);
    try {
      const bookingData: BookingInsertData = {
        customer_id: parseInt(formData.customerId),
        slot_id: parseInt(formData.slotId),
        check_in_date: formData.checkInDate.toISOString(),
        check_out_date: formData.checkOutDate.toISOString(),
        special_requirements: formData.specialRequirements || null,
        status: 'pending',
        reservation_code: `NEW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Guaranteed unique temporary code
      };

      const { error } = await supabase
        .from("bookings")
        .insert(bookingData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking created successfully",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createBooking, isLoading };
};