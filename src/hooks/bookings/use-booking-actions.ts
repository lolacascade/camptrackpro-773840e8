import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BookingInsert } from "@/types/database/booking";
import { useToast } from "@/hooks/use-toast";

export function useBookingActions(refetch: () => void) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const duplicateBookingMutation = useMutation({
    mutationFn: async (booking: BookingInsert) => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking duplicated",
        description: "The booking has been successfully duplicated.",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error duplicating booking",
        description: "There was an error duplicating the booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking deleted",
        description: "The booking has been successfully deleted.",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error deleting booking",
        description: "There was an error deleting the booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    duplicateBooking: duplicateBookingMutation.mutate,
    deleteBooking: deleteBookingMutation.mutate,
  };
}