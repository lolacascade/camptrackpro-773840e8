
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { useSession } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { Booking, BookingStatus } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";

interface BookingFormData {
  customer_id: string;
  rv_id: string;
  site_id: string;
  status: BookingStatus;
  total_amount?: number;
  special_requirements?: string;
}

interface UseBookingFormProps {
  booking?: Booking;
  onClose: () => void;
  onBookingUpdated: () => void;
  newlyCreatedCustomer: Customer | null;
  newlyCreatedRvId: string | null;
  newlyCreatedSiteId: string | null;
}

export function useBookingForm({ 
  booking, 
  onClose, 
  onBookingUpdated,
  newlyCreatedCustomer,
  newlyCreatedRvId,
  newlyCreatedSiteId
}: UseBookingFormProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: booking ? new Date(booking.check_in) : new Date(),
    to: booking ? new Date(booking.check_out) : addDays(new Date(), 7)
  });

  const form = useForm<BookingFormData>({
    defaultValues: booking ? {
      customer_id: booking.customer_id || '',
      rv_id: booking.rv_id || '',
      site_id: booking.site_id || '',
      status: booking.status,
      total_amount: booking.total_amount || undefined,
      special_requirements: booking.special_requirements || undefined
    } : {
      customer_id: newlyCreatedCustomer?.id || '',
      rv_id: newlyCreatedRvId || '',
      site_id: newlyCreatedSiteId || '',
      status: 'pending',
      total_amount: undefined,
      special_requirements: undefined
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

      if (!data.rv_id) {
        toast.error("Please select an RV");
        return;
      }

      if (!data.site_id) {
        toast.error("Please select a site");
        return;
      }

      const submitData = {
        customer_id: data.customer_id,
        rv_id: data.rv_id,
        site_id: data.site_id,
        check_in: dateRange.from.toISOString(),
        check_out: dateRange.to.toISOString(),
        status: data.status,
        organization_id: organizationId,
        account_id: accountId,
        total_amount: data.total_amount,
        special_requirements: data.special_requirements
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
    form,
    dateRange,
    setDateRange,
    onSubmit: form.handleSubmit(onSubmit)
  };
}
