
import { useForm } from "react-hook-form";
import { BookingFormData } from "@/types";
import { useOrganization } from "@/hooks/use-organization";
import { createBooking, updateBooking } from "@/services/BookingService";
import { useQueryClient } from "@tanstack/react-query";

interface UseBookingFormProps {
  booking?: { id: string } & Partial<BookingFormData>;
  onClose: () => void;
  onSuccess: () => void;
}

export function useBookingForm({ booking, onClose, onSuccess }: UseBookingFormProps) {
  const { organizationId, accountId } = useOrganization();
  const queryClient = useQueryClient();
  
  const form = useForm<BookingFormData>({
    defaultValues: {
      customer_id: booking?.customer_id || '',
      rv_id: booking?.rv_id || '',
      site_id: booking?.site_id || '',
      check_in: booking?.check_in || '',
      check_out: booking?.check_out || '',
      status: booking?.status || 'pending',
      total_amount: booking?.total_amount || 0,
      special_requirements: booking?.special_requirements || ''
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      if (!organizationId || !accountId) return;

      if (booking?.id) {
        await updateBooking(booking.id, data);
      } else {
        await createBooking(data, organizationId, accountId);
      }

      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
