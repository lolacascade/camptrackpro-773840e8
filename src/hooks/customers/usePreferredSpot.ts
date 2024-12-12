import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function usePreferredSpot() {
  const session = useSession();

  return useQuery({
    queryKey: ['preferredSpot'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          slot_id,
          slots (
            name,
            zone,
            dock
          )
        `)
        .not('slot_id', 'is', null);
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return 'No bookings yet';
      }
      
      // Count occurrences of each slot
      const slotCounts = data.reduce((acc: Record<string, number>, booking) => {
        const slotId = booking.slot_id;
        acc[slotId] = (acc[slotId] || 0) + 1;
        return acc;
      }, {});
      
      // Find the slot with the highest count
      const [mostFrequentSlotId] = Object.entries(slotCounts)
        .sort(([, a], [, b]) => b - a)[0];
      
      const mostBookedSlot = data.find(booking => 
        booking.slot_id.toString() === mostFrequentSlotId && booking.slots
      );
      
      if (!mostBookedSlot?.slots) return 'No preference yet';
      
      return `${mostBookedSlot.slots.dock || ''} ${mostBookedSlot.slots.name}${
        mostBookedSlot.slots.zone ? ` (${mostBookedSlot.slots.zone})` : ''
      }`.trim();
    },
    enabled: !!session?.user?.id
  });
}