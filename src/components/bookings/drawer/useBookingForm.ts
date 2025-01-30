import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

export function useBookingForm({ booking, onClose, onBookingUpdated }: {
  booking?: Booking;
  onClose: () => void;
  onBookingUpdated: () => void;
}) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: booking ? new Date(booking.check_in_date) : new Date(),
    to: booking ? new Date(booking.check_out_date) : addDays(new Date(), 7)
  });
  const [calculatedAmount, setCalculatedAmount] = useState<number | null>(null);
  const [manualAmount, setManualAmount] = useState<string>(booking?.total_amount?.toString() || '');

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

  const form = useForm({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      site_id: booking.site_id,
      special_requirements: booking.special_requirements,
      total_amount: booking.total_amount
    } : {}
  });

  const calculateTotal = async () => {
    const assetId = form.watch('asset_id');
    if (!assetId || !dateRange?.from || !dateRange?.to) {
      setCalculatedAmount(null);
      return;
    }

    try {
      const { data, error } = await supabase.rpc(
        'calculate_rv_booking_total',
        { 
          p_asset_id: assetId,
          p_start_date: dateRange.from.toISOString(),
          p_end_date: dateRange.to.toISOString()
        }
      );

      if (error) throw error;
      setCalculatedAmount(data);
      if (!manualAmount) {
        setManualAmount(data.toString());
      }
    } catch (error) {
      console.error('Error calculating total:', error);
      toast.error("Failed to calculate booking total");
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [form.watch('asset_id'), dateRange]);

  const onSubmit = async (data: any) => {
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
        status: 'pending' as const,
        created_by: profile?.id,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId,
        total_amount: parseFloat(manualAmount) || calculatedAmount
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
    calculatedAmount,
    manualAmount,
    setManualAmount,
    onSubmit: form.handleSubmit(onSubmit)
  };
}