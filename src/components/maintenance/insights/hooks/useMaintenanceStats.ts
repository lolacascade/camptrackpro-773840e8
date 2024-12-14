import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export interface MaintenanceStats {
  totalRequests: {
    open: number;
    inProgress: number;
    completed: number;
  };
  resolutionTime: {
    average: number;
    target: number;
  };
  criticalIssues: {
    critical: number;
    scheduled: number;
  };
  equipmentStatus: {
    underMaintenance: number;
    operational: number;
  };
}

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

      // Fetch assets
      const { data: assets, error: assetsError } = await supabase
        .from('assets')
        .select('id, asset_type')
        .eq('user_id', session.user.id);

      if (assetsError) throw assetsError;

      // Calculate total requests by status
      const open = requests?.filter(r => r.status === 'pending').length || 0;
      const inProgress = requests?.filter(r => r.status === 'in_progress').length || 0;
      const completed = requests?.filter(r => r.status === 'completed').length || 0;

      // Calculate average resolution time
      const completedRequests = requests?.filter(r => r.status === 'completed' && r.completed_at && r.created_at) || [];
      const totalResolutionTime = completedRequests.reduce((acc, req) => {
        const created = new Date(req.created_at);
        const completed = new Date(req.completed_at);
        return acc + (completed.getTime() - created.getTime());
      }, 0);
      const averageResolutionDays = completedRequests.length > 0 
        ? Math.round(totalResolutionTime / (completedRequests.length * 24 * 60 * 60 * 1000))
        : 0;

      // Count critical issues
      const critical = requests?.filter(r => r.priority === 'high').length || 0;
      const scheduled = requests?.filter(r => r.priority === 'medium' || r.priority === 'low').length || 0;

      // Calculate equipment status
      const total = assets?.length || 0;
      const underMaintenance = requests?.filter(r => r.status === 'in_progress').length || 0;
      const operationalPercentage = total > 0 ? Math.round(((total - underMaintenance) / total) * 100) : 0;

      return {
        totalRequests: {
          open,
          inProgress,
          completed
        },
        resolutionTime: {
          average: averageResolutionDays,
          target: 3
        },
        criticalIssues: {
          critical,
          scheduled
        },
        equipmentStatus: {
          underMaintenance,
          operational: operationalPercentage
        }
      };
    },
    enabled: !!session?.user?.id,
  });
}