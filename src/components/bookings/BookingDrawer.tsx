import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BaseDrawer } from "@/components/common/BaseDrawer";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { BookingDateRange } from "./form/BookingDateRange";
import { CustomerSelect } from "./form/CustomerSelect";
import { AssetSelect } from "./form/AssetSelect";
import { SlotSelect } from "./form/SlotSelect";
import { Booking } from "@/types/booking";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export function BookingDrawer({ 
  booking,
  open,
  onClose,
  onBookingUpdated
}: BookingDrawerProps) {
  const { toast } = useToast();
  const session = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: booking?.check_in_date ? new Date(booking.check_in_date) : new Date(),
    to: booking?.check_out_date ? new Date(booking.check_out_date) : addDays(new Date(), 1)
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    booking?.customer_id || null
  );
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(
    booking?.slot_id || null
  );

  const handleSave = async () => {
    if (!session?.user?.id || !dateRange?.from || !dateRange?.to || !selectedCustomerId || !selectedSlotId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const bookingData = {
        user_id: session.user.id,
        customer_id: selectedCustomerId,
        slot_id: selectedSlotId,
        check_in_date: dateRange.from.toISOString(),
        check_out_date: dateRange.to.toISOString(),
        status: 'pending',
        reservation_code: `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        created_at: new Date().toISOString(),
      };

      if (booking) {
        const { error } = await supabase
          .from('bookings')
          .update(bookingData)
          .eq('id', booking.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('bookings')
          .insert([bookingData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Booking ${booking ? 'updated' : 'created'} successfully`,
      });
      onBookingUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      toast({
        title: "Error",
        description: `Failed to ${booking ? 'update' : 'create'} booking`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <div className="space-y-6">
        <BookingDateRange
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <CustomerSelect
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={setSelectedCustomerId}
        />

        <AssetSelect
          selectedAssetId={selectedAssetId}
          onAssetSelect={setSelectedAssetId}
          customerId={selectedCustomerId}
        />

        <SlotSelect
          selectedSlotId={selectedSlotId}
          onSlotSelect={setSelectedSlotId}
          dateRange={dateRange}
          assetId={selectedAssetId}
        />

        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? "Saving..." : (booking ? "Update Booking" : "Create Booking")}
        </Button>
      </div>
    </BaseDrawer>
  );
}