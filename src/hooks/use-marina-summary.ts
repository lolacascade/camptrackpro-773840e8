import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaSummary } from "@/types/dashboard";

export function useMarinaSummary() {
  return useQuery({
    queryKey: ["marina-summary"],
    queryFn: async (): Promise<MarinaSummary> => {
      // Fetch data from Supabase
      const { data: slots, error } = await supabase
        .from("slots")
        .select("status")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      const totalSlips = slots?.length ?? 0;
      const occupiedSlips = slots?.filter(slot => slot.status === "occupied").length ?? 0;
      const occupancyRate = totalSlips > 0 ? Math.round((occupiedSlips / totalSlips) * 100) : 0;

      return {
        totalSlips,
        occupiedSlips,
        activeRVs: occupiedSlips, // Assuming one RV per occupied slot
        occupancyRate,
        monthlyRevenue: 45000, // Example data
        pendingMaintenance: 8, // Example data
      };
    },
  });
}