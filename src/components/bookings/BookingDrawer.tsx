import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BaseDrawer } from "@/components/common/BaseDrawer";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const { handleSubmit } = useForm({
    defaultValues: booking || {
      status: 'pending',
    }
  });

  const onSubmit = async (data: any) => {
    try {
      if (booking?.id) {
        const { error } = await supabase
          .from('bookings')
          .update(data)
          .eq('id', booking.id);

        if (error) throw error;
        toast.success("Booking updated successfully");
      } else {
        const { error } = await supabase
          .from('bookings')
          .insert([data]);

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