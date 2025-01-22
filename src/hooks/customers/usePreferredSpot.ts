import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePreferredSpot(customerId?: string) {
  return useQuery({
    queryKey: ['preferred-spot', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('slot_id')
        .eq('customer_id', customerId);

      if (!bookings?.length) return null;

      // Count occurrences of each slot
      const slotCounts = bookings.reduce((acc, booking) => {
        if (booking.slot_id) {
          acc[booking.slot_id] = (acc[booking.slot_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<number, number>);

      // Find the most frequent slot
      const mostFrequentSlotId = Number(Object.entries(slotCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0]);

      if (!mostFrequentSlotId) return null;

      const { data: slot } = await supabase
        .from('slots')
        .select('*')
        .eq('id', mostFrequentSlotId)
        .single();

      return slot;
    },
    enabled: !!customerId
  });
}