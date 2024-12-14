import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaStats } from "@/types/marina";

export function useMarineStats() {
  return useQuery({
    queryKey: ['marina-stats'],
    queryFn: async (): Promise<MarinaStats> => {
      const today = new Date().toISOString();
      const [slotsData, bookingsData] = await Promise.all([
        supabase.from('slots').select('status'),
        supabase.from('bookings')
          .select('*')
          .gte('check_in_date', today)
          .lte('check_in_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      if (slotsData.error) throw slotsData.error;
      if (bookingsData.error) throw bookingsData.error;

      const totalSlots = slotsData.data?.length || 0;
      const availableSlots = slotsData.data?.filter(slot => slot.status === 'available').length || 0;
      const maintenanceSlots = slotsData.data?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupiedSlots = totalSlots - availableSlots - maintenanceSlots;
      const upcomingArrivals = bookingsData.data?.length || 0;

      return {
        totalSlots,
        availableSlots,
        maintenanceSlots,
        occupiedSlots,
        occupancyRate: Math.round((occupiedSlots / totalSlots) * 100),
        upcomingArrivals
      };
    }
  });
}