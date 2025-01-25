import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MarinaStats {
  totalSlots: number;
  availableSlots: number;
  maintenanceSlots: number;
  occupiedSlots: number;
  occupancyRate: number;
  upcomingArrivals: number;
}

export function useMarineStats() {
  return useQuery({
    queryKey: ['marina-stats'],
    queryFn: async (): Promise<MarinaStats> => {
      const today = new Date().toISOString();
      const [sitesData, bookingsData] = await Promise.all([
        supabase.from('sites').select('status'),
        supabase.from('bookings')
          .select('*')
          .gte('check_in_date', today)
          .lte('check_in_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      if (sitesData.error) throw sitesData.error;
      if (bookingsData.error) throw bookingsData.error;

      const totalSlots = sitesData.data?.length || 0;
      const availableSlots = sitesData.data?.filter(site => site.status === 'available').length || 0;
      const maintenanceSlots = sitesData.data?.filter(site => site.status === 'maintenance').length || 0;
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