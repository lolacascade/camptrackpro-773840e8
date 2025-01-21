import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BaseDrawer } from "@/components/common/BaseDrawer";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

type BookingFormData = {
  customer_id: string;
  asset_id: string;
  check_in_date: string;
  check_out_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_amount: number;
  slot_id?: number;
  special_requirements?: string;
  reservation_code?: string;
  user_id?: string;
};

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const session = useSession();
  
  const { handleSubmit } = useForm<BookingFormData>({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      status: booking.status === 'checked_in' ? 'confirmed' : booking.status,
      total_amount: booking.total_amount,
      slot_id: booking.slot_id,
      special_requirements: booking.special_requirements,
      reservation_code: booking.reservation_code,
      user_id: booking.user_id
    } : {
      status: 'pending',
      total_amount: 0
    } as Partial<BookingFormData>
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const submitData = {
        ...data,
        created_by: session.user.id,
      };

      if (booking?.id) {
        const { error } = await supabase
          .from('bookings')
          .update(submitData)
          .eq('id', booking.id);

        if (error) throw error;
        toast.success("Booking updated successfully");
      } else {
        const { error } = await supabase
          .from('bookings')
          .insert([submitData]);

        if (error) throw error;
        toast.success("Booking created successfully");
      }
      
      onBookingUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      toast.error("Failed to save booking");
    }
  };

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields will be added here in future updates */}
        <Button type="submit" className="w-full">
          {booking ? "Update Booking" : "Create Booking"}
        </Button>
      </form>
    </BaseDrawer>
  );
}