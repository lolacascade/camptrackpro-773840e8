
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MaintenanceDrawer } from "@/components/maintenance/MaintenanceDrawer";
import { AddMaintenanceDrawer } from "@/components/maintenance/AddMaintenanceDrawer";
import { MaintenanceStatsCards } from "@/components/maintenance/insights/MaintenanceStatsCards";
import { MaintenanceHeader } from "@/components/maintenance/MaintenanceHeader";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import type { Maintenance } from "@/types/maintenance";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useOrganization } from "@/hooks/use-organization";

const FILTER_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" }
] as const;

export default function Maintenance() {
  const { toast } = useToast();
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { organizationId, accountId, isLoading: orgLoading } = useOrganization();

  const { data: maintenanceRequests = [], isLoading, refetch } = useQuery({
    queryKey: ['maintenance_requests', statusFilter, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        console.log('Missing organization or account ID:', { organizationId, accountId });
        return [];
      }

      try {
        console.log('Fetching maintenance requests with:', { organizationId, accountId, statusFilter });
        
        let query = supabase
          .from('maintenance_requests')
          .select(`
            id,
            description,
            status,
            priority,
            assigned_to,
            created_at,
            updated_at,
            completed_at,
            customer_id,
            site_id,
            user_id,
            organization_id,
            account_id,
            site:sites(
              id,
              name,
              status
            )
          `)
          .eq('organization_id', organizationId)
          .eq('account_id', accountId);

        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching maintenance requests:', error);
          throw error;
        }

        console.log('Fetched maintenance requests:', data);
        return data as Maintenance[];
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        toast({
          title: "Error",
          description: "Failed to load maintenance requests.",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!organizationId && !!accountId,
    retry: 1
  });

  if (!organizationId || !accountId) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Loading organization data...</p>
      </div>
    );
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <MaintenanceHeader onAddRequest={() => setIsAddDrawerOpen(true)} />
          <MaintenanceStatsCards />

          {isLoading || orgLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <MaintenanceTable
              maintenanceRequests={maintenanceRequests}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              filterOptions={FILTER_OPTIONS}
            />
          )}

          <AddMaintenanceDrawer
            isOpen={isAddDrawerOpen}
            onClose={() => setIsAddDrawerOpen(false)}
            onMaintenanceAdded={refetch}
          />

          <MaintenanceDrawer
            maintenance={selectedMaintenance}
            open={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              setSelectedMaintenance(null);
            }}
            onMaintenanceUpdated={refetch}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
