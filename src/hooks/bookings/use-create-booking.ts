import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BookingFormValues, BookingInsert } from "@/types/database/booking";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: BookingFormValues) => {
      const bookingData: BookingInsert = {
        customer_id: parseInt(values.customerId),
        slot_id: parseInt(values.slotId),
        check_in_date: values.checkInDate.toISOString(),
        check_out_date: values.checkOutDate.toISOString(),
        special_requirements: values.specialRequirements || null,
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: "Booking created",
        description: "The booking has been successfully created.",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error creating booking",
        description: "There was an error creating the booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    createBooking: mutation.mutate,
    isLoading: mutation.isPending
  };
}