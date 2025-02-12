
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";
import { Customer } from "@/types/customer";

type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

type BookingFormData = {
  customer_id: string;
  asset_id: string;
  site_id: string;
  special_requirements?: string;
  status?: BookingStatus;
  total_amount?: number;
};

interface UseBookingFormProps {
  booking?: Booking;
  onClose: () => void;
  onBookingUpdated: () => void;
  newlyCreatedCustomer: Customer | null;
  newlyCreatedAssetId: string | null;
  newlyCreatedSiteId: string | null;
}

export function useBookingForm({ 
  booking, 
  onClose, 
  onBookingUpdated,
  newlyCreatedCustomer,
  newlyCreatedAssetId,
  newlyCreatedSiteId
}: UseBookingFormProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: booking ? new Date(booking.check_in_date) : new Date(),
    to: booking ? new Date(booking.check_out_date) : addDays(new Date(), 7)
  });

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
        toast.error("Failed to fetch profile");
        return null;
      }
      return data;
    },
    enabled: !!session?.user?.id
  });

  const form = useForm<BookingFormData>({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      site_id: booking.site_id?.toString() || '',
      special_requirements: booking.special_requirements,
      status: booking.status as BookingStatus,
      total_amount: booking.total_amount
    } : {
      customer_id: newlyCreatedCustomer?.id || '',
      asset_id: newlyCreatedAssetId || '',
      site_id: newlyCreatedSiteId || ''
    }
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

      if (!data.customer_id) {
        toast.error("Please select a customer");
        return;
      }

      if (!data.asset_id) {
        toast.error("Please select an RV");
        return;
      }

      if (!data.site_id) {
        toast.error("Please select a site");
        return;
      }

      const submitData = {
        customer_id: data.customer_id,
        asset_id: data.asset_id,
        site_id: parseInt(data.site_id),
        check_in_date: dateRange.from.toISOString(),
        check_out_date: dateRange.to.toISOString(),
        status: (data.status || 'pending') as BookingStatus,
        special_requirements: data.special_requirements,
        created_by: profile?.id,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId,
        total_amount: data.total_amount || 0
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
      toast.error("Failed to save booking");
    }
  };

  return {
    form,
    dateRange,
    setDateRange,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
