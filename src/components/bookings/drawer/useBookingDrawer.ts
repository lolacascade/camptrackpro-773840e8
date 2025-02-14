
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingFormData, UseBookingDrawerProps } from "../types";
import { BookingStatus } from "@/types/booking";

export function useBookingDrawer({ booking, onClose, onBookingUpdated }: UseBookingDrawerProps) {
  const session = useSession();
  const { organizationId, accountId, isLoading: isOrgLoading } = useOrganization();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: booking ? new Date(booking.check_in_date) : new Date(),
    to: booking ? new Date(booking.check_out_date) : addDays(new Date(), 7)
  });

  const { data: profile, isLoading: isProfileLoading } = useQuery({
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

  const handleSubmit = async (data: BookingFormData) => {
    try {
      // Wait for organization context to be loaded
      if (isOrgLoading || isProfileLoading) {
        toast.error("Loading required context...");
        return;
      }

      if (!session?.user?.id || !organizationId || !accountId) {
        toast.error("Missing required organization context");
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
        status: (data.status || 'pending') as BookingStatus,
        created_by: profile?.id,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId,
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

  return {
    dateRange,
    setDateRange,
    handleSubmit,
    profile,
    isLoading: isOrgLoading || isProfileLoading
  };
}
