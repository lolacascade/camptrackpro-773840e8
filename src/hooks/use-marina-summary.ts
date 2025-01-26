import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export function useMarinaSummary() {
  const session = useSession();

  return useQuery({
    queryKey: ['marina-summary', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      // Get all sites for the user
      const { data: sites, error: sitesError } = await supabase
        .from('sites')
        .select('*')
        .eq('user_id', session.user.id);

      if (sitesError) throw sitesError;

      // Calculate summary statistics
      const totalSlots = sites?.length || 0;
      const occupiedSlots = sites?.filter(site => site.status === 'occupied').length || 0;
      const maintenanceSlots = sites?.filter(site => site.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
        occupancyRate
      };
    },
    enabled: !!session?.user?.id
  });
}