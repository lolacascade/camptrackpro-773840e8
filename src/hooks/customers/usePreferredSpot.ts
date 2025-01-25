import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePreferredSpot(customerId?: string) {
  return useQuery({
    queryKey: ['preferred-spot', customerId],
    queryFn: async () => {
      if (!customerId) return null;

      const { data: bookings } = await supabase
        .from('bookings')
        .select('site_id')
        .eq('customer_id', customerId);

      if (!bookings?.length) return null;

      // Count occurrences of each site
      const siteCounts = bookings.reduce((acc, booking) => {
        if (booking.site_id) {
          acc[booking.site_id] = (acc[booking.site_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<number, number>);

      // Find the most frequent site
      const mostFrequentSiteId = Number(Object.entries(siteCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0]);

      if (!mostFrequentSiteId) return null;

      const { data: site } = await supabase
        .from('sites')
        .select('*')
        .eq('id', mostFrequentSiteId)
        .single();

      return site;
    },
    enabled: !!customerId
  });
}