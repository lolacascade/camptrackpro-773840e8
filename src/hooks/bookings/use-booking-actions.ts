import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookingWithRelations, BookingInsert } from "@/types/database/booking";

export function useBookingActions(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const duplicateBooking = async (booking: BookingWithRelations) => {
    setIsLoading(true);
    try {
      const newBooking: BookingInsert = {
        customer_id: booking.customer_id,
        slot_id: booking.slot_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        special_requirements: booking.special_requirements,
        status: 'pending'
      };

      const { error } = await supabase
        .from('bookings')
        .insert(newBooking);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking duplicated successfully",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error duplicating booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to duplicate booking",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBooking = async (booking: BookingWithRelations) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', booking.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete booking",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    duplicateBooking,
    deleteBooking,
    isLoading
  };
}