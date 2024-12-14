import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import type { MaintenanceStats } from "../types/maintenance-stats";
import { calculateRequestsByStatus } from "./calculations/requestStats";
import { calculateResolutionTime } from "./calculations/resolutionStats";
import { calculateCriticalIssues } from "./calculations/criticalStats";
import { calculateEquipmentStatus } from "./calculations/equipmentStats";
import type { Maintenance } from "@/types/maintenance";

export function useMaintenanceStats() {
  const session = useSession();

  return useQuery({
    queryKey: ['maintenance-stats'],
    queryFn: async (): Promise<MaintenanceStats> => {
      if (!session?.user?.id) throw new Error("No authenticated user");

      // Fetch maintenance requests
      const { data: requests, error: requestsError } = await supabase
        .from('maintenance_requests')
        .select(`
          id,
          description,
          status,
          priority,
          created_at,
          completed_at,
          updated_at,
          assigned_to,
          customer_id,
          slot_id,
          user_id
        `)
        .eq('user_id', session.user.id);

      if (requestsError) throw requestsError;

      // Get total slots count
      const { count: totalSlots, error: slotsError } = await supabase
        .from('slots')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (slotsError) throw slotsError;

      const maintenanceRequests = requests as Maintenance[] || [];
      
      return {
        totalRequests: calculateRequestsByStatus(maintenanceRequests),
        resolutionTime: calculateResolutionTime(maintenanceRequests),
        criticalIssues: calculateCriticalIssues(maintenanceRequests),
        equipmentStatus: calculateEquipmentStatus(maintenanceRequests, totalSlots || 0)
      };
    },
    enabled: !!session?.user?.id,
  });
}