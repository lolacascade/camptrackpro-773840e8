import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function usePreferredSpot() {
  const session = useSession();

  return useQuery({
    queryKey: ['preferredSpot'],
    queryFn: async () => {
      console.log('Fetching preferred spot...');
      
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
      
      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No bookings found');
        return 'No bookings yet';
      }
      
      // Count occurrences of each slot
      const slotCounts = data.reduce((acc: Record<string, { count: number; details: any }>, booking) => {
        const slotId = booking.slot_id;
        if (!acc[slotId]) {
          acc[slotId] = { count: 0, details: booking.slots };
        }
        acc[slotId].count++;
        return acc;
      }, {});
      
      // Find the slot with the highest count
      const [, mostBooked] = Object.entries(slotCounts)
        .sort(([, a], [, b]) => b.count - a.count)[0];
      
      console.log('Most booked slot:', mostBooked);
      
      if (!mostBooked?.details) return 'No preference yet';
      
      return `${mostBooked.details.dock || ''} ${mostBooked.details.name}${
        mostBooked.details.zone ? ` (${mostBooked.details.zone})` : ''
      }`.trim();
    },
    enabled: !!session?.user?.id
  });
}