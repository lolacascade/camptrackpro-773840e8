import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BaseDrawer } from "@/components/common/BaseDrawer";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { CustomerSelect } from "./form/CustomerSelect";
import { BookingDateRange } from "./form/BookingDateRange";
import { AssetSelect } from "./form/AssetSelect";
import { SlotSelect } from "./form/SlotSelect";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useCustomers } from "./form/useCustomers";
import { useQuery } from "@tanstack/react-query";
import { useOrganization } from "@/hooks/use-organization";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

type BookingFormData = {
  customer_id: string;
  asset_id: string;
  site_id: number;
  special_requirements?: string;
};

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const { customers } = useCustomers();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  
  // Fetch the user's profile to get the correct ID for created_by
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    },
    enabled: !!session?.user?.id
  });

  const { register, handleSubmit, setValue, watch } = useForm<BookingFormData>({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      site_id: booking.site_id,
      special_requirements: booking.special_requirements
    } : {}
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      if (!session?.user?.id || !organizationId || !accountId) {
        toast.error("Missing required context");
        return;
      }

      if (!dateRange?.from || !dateRange?.to) {
        toast.error("Please select a date range");
        return;
      }

      const submitData = {
        ...data,
        check_in_date: dateRange.from.toISOString(),
        check_out_date: dateRange.to.toISOString(),
        status: 'pending' as BookingStatus,
        created_by: profile?.id,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId,
        total_amount: 0 // This will be calculated by the database function
      };

      console.log('Submitting booking data:', submitData);

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
        <CustomerSelect
          value={watch('customer_id') || ''}
          onSelect={(value) => setValue('customer_id', value)}
          customers={customers}
        />

        <BookingDateRange
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <AssetSelect
          value={watch('asset_id') || ''}
          onSelect={(value) => setValue('asset_id', value)}
        />

        <SlotSelect
          value={watch('site_id')?.toString() || ''}
          onSelect={(value) => setValue('site_id', parseInt(value))}
          dateRange={dateRange}
        />

        <Button type="submit" className="w-full">
          {booking ? "Update Booking" : "Create Booking"}
        </Button>
      </form>
    </BaseDrawer>
  );
}