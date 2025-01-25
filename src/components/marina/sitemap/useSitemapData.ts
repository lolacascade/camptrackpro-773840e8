import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

interface MarinaStats {
  totalSlots: number;
  occupiedSlots: number;
  maintenanceSlots: number;
  occupancyRate: number;
}

export function useSitemapData() {
  const { organizationId, accountId } = useOrganization();

  const { data: stats, isLoading: statsLoading } = useQuery<MarinaStats>({
    queryKey: ['marina-stats', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        toast.error("Organization or account context not found");
        throw new Error("Missing organization or account context");
      }

      const { data: slots, error } = await supabase
        .from('slots')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error("Error fetching marina stats:", error);
        toast.error("Error fetching marina stats");
        throw error;
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
    },
    enabled: !!organizationId && !!accountId
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery<Slot[]>({
    queryKey: ['slots', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        toast.error("Organization or account context not found");
        throw new Error("Missing organization or account context");
      }

      const { data, error } = await supabase
        .from('slots')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error("Error fetching slots:", error);
        toast.error("Error fetching slots");
        throw error;
      }

      return data as Slot[];
    },
    enabled: !!organizationId && !!accountId
  });

  return {
    stats,
    statsLoading,
    slots,
    slotsLoading
  };
}