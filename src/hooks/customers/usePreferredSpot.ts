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
            zone
          )
        `)
        .order('slot_id');
      
      if (error) throw error;
      
      // Find the most frequent slot
      const slotCounts = data.reduce((acc: any, booking) => {
        const slotId = booking.slot_id;
        acc[slotId] = (acc[slotId] || 0) + 1;
        return acc;
      }, {});
      
      const mostFrequentSlotId = Object.entries(slotCounts)
        .sort(([,a]: any, [,b]: any) => b - a)[0]?.[0];
      
      const preferredSlot = data.find(booking => booking.slot_id.toString() === mostFrequentSlotId);
      return preferredSlot?.slots ? 
        `${preferredSlot.slots.name} / ${preferredSlot.slots.zone || 'N/A'}` : 
        'No preference yet';
    },
    enabled: !!session?.user?.id
  });
}