import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaSummary } from "@/types/dashboard";

export const useMarinaSummary = () => {
  return useQuery({
    queryKey: ['marinaSummary'],
    queryFn: async (): Promise<MarinaSummary> => {
      console.log('Fetching marina summary...');
      const { data: slipsData, error: slipsError } = await supabase
        .from('slips')
        .select('status');

      if (slipsError) throw slipsError;

      const { data: boatsData, error: boatsError } = await supabase
        .from('boats')
        .select('id');

      if (boatsError) throw boatsError;

      console.log('Slips data:', slipsData);
      console.log('Boats data:', boatsData);

      const totalSlips = slipsData.length;
      const occupiedSlips = slipsData.filter(slip => slip.status === 'occupied').length;
      const activeBoats = boatsData.length;
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