import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/common/FormSelect";
import { DateRange } from "react-day-picker";
import { Slot } from "@/types/slot";

interface SlotSelectProps {
  selectedSlotId: number | null;
  onSlotSelect: (slotId: number | null) => void;
  dateRange: DateRange | undefined;
  assetId: number | null;
}

export function SlotSelect({ 
  selectedSlotId, 
  onSlotSelect, 
  dateRange,
  assetId 
}: SlotSelectProps) {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!dateRange?.from || !dateRange?.to || !assetId) {
        setAvailableSlots([]);
        setIsLoading(false);
        return;
      }

      try {
        // First get all slots
        const { data: allSlots, error: slotsError } = await supabase
          .from('slots')
          .select('*')
          .eq('status', 'available')
          .order('name');
        
        if (slotsError) throw slotsError;

        // Then get existing bookings for the date range
        const { data: existingBookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('slot_id')
          .or(`check_in_date.lte.${dateRange.to.toISOString()},check_out_date.gte.${dateRange.from.toISOString()}`);

        if (bookingsError) throw bookingsError;

        // Filter out slots that have bookings in the selected date range
        const bookedSlotIds = new Set(existingBookings?.map(b => b.slot_id));
        const availableSlots = (allSlots || []).filter(slot => !bookedSlotIds.has(slot.id)).map(slot => ({
          ...slot,
          status: slot.status as Slot['status'] // Ensure correct type
        }));

        setAvailableSlots(availableSlots);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [dateRange, assetId]);

  const slotOptions = availableSlots.map(slot => ({
    value: slot.id.toString(),
    label: slot.name
  }));

  return (
    <div className="space-y-2">
      <Label>Available Sites</Label>
      <FormSelect
        value={selectedSlotId?.toString() || ''}
        onValueChange={(value) => onSlotSelect(value ? parseInt(value) : null)}
        options={slotOptions}
        placeholder={
          !dateRange?.from || !dateRange?.to 
            ? "Select dates first"
            : !assetId
            ? "Select an RV first"
            : "Select a site"
        }
        disabled={!dateRange?.from || !dateRange?.to || !assetId}
      />
    </div>
  );
}