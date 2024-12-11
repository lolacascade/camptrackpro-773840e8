import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaSummary } from "@/types/dashboard";

export const useMarinaSummary = () => {
  return useQuery({
    queryKey: ['marinaSummary'],
    queryFn: async (): Promise<MarinaSummary> => {
      console.log('Fetching marina summary...');
      const { data: slotsData, error: slotsError } = await supabase
        .from('slots')
        .select('status');

      if (slotsError) throw slotsError;

      const { data: assetsData, error: assetsError } = await supabase
        .from('assets')
        .select('id');

      if (assetsError) throw assetsError;

      console.log('Slots data:', slotsData);
      console.log('Assets data:', assetsData);

      const totalSlips = slotsData.length;
      const occupiedSlips = slotsData.filter(slot => slot.status === 'occupied').length;
      const activeBoats = assetsData.length;
      const occupancyRate = totalSlips > 0 
        ? Math.round((occupiedSlips / totalSlips) * 100)
        : 0;

      return {
        totalSlips,
        occupiedSlips,
        activeBoats,
        occupancyRate
      };
    }
  });
};