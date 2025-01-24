import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { useToast } from "@/components/ui/use-toast";

interface MarinaStats {
  totalSlots: number;
  occupiedSlots: number;
  maintenanceSlots: number;
  occupancyRate: number;
}

export function useSitemapData() {
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useQuery<MarinaStats>({
    queryKey: ['marina-stats'],
    queryFn: async () => {
      const { data: slots, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching marina stats",
          description: error.message,
          variant: "destructive",
        });
        return {
          totalSlots: 0,
          occupiedSlots: 0,
          maintenanceSlots: 0,
          occupancyRate: 0
        };
      }

      const totalSlots = slots?.length || 0;
      const occupiedSlots = slots?.filter(slot => slot.status === 'occupied').length || 0;
      const maintenanceSlots = slots?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
        occupancyRate
      };
    }
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery<Slot[]>({
    queryKey: ['slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching slots",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return (data || []) as Slot[];
    }
  });

  return {
    stats,
    statsLoading,
    slots,
    slotsLoading
  };
}