import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import type { MaintenanceStats } from "../types/maintenance-stats";
import type { Maintenance } from "@/types/maintenance";

// Helper functions for calculations
const calculateRequestsByStatus = (requests: Maintenance[]) => {
  const open = requests.filter(r => r.status === 'pending').length;
  const inProgress = requests.filter(r => r.status === 'in_progress').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  return { open, inProgress, completed };
};

const calculateResolutionTime = (requests: Maintenance[]) => {
  const completedRequests = requests.filter(r => 
    r.status === 'completed' && r.completed_at && r.created_at
  );
  
  const totalResolutionTime = completedRequests.reduce((acc, req) => {
    const created = new Date(req.created_at);
    const completed = new Date(req.completed_at!);
    return acc + (completed.getTime() - created.getTime());
  }, 0);

  const averageDays = completedRequests.length > 0 
    ? Math.round(totalResolutionTime / (completedRequests.length * 24 * 60 * 60 * 1000))
    : 0;

  return {
    average: averageDays,
    target: 3 // This could be made configurable if needed
  };
};

const calculateCriticalIssues = (requests: Maintenance[]) => {
  const critical = requests.filter(r => r.priority === 'high').length;
  const scheduled = requests.filter(r => 
    r.priority === 'medium' || r.priority === 'low'
  ).length;
  
  return { critical, scheduled };
};

const calculateEquipmentStatus = (requests: Maintenance[], totalSlots: number) => {
  const underMaintenance = requests.filter(r => r.status === 'in_progress').length;
  const operationalPercentage = totalSlots > 0 
    ? Math.round(((totalSlots - underMaintenance) / totalSlots) * 100) 
    : 0;

  return {
    underMaintenance,
    operational: operationalPercentage
  };
};

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
          completed_at
        `)
        .eq('user_id', session.user.id);

      if (requestsError) throw requestsError;

      // Get total slots count
      const { count: totalSlots, error: slotsError } = await supabase
        .from('slots')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (slotsError) throw slotsError;

      const maintenanceRequests = requests || [];
      
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