import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BookingInsert } from "@/types/database/booking";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBooking = async (booking: BookingInsert) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          customer_id: booking.customer_id,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          slot_id: booking.slot_id,
          special_requirements: booking.special_requirements,
          status: booking.status || 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking created",
        description: "The booking has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating booking",
        description: "There was an error creating the booking. Please try again.",
        variant: "destructive",
      });
    },
  });
}