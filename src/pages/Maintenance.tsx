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

export default function Maintenance() {
  const { toast } = useToast();
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { organizationId, accountId } = useOrganization();

  const { data: maintenanceRequests = [], isLoading, refetch } = useQuery({
    queryKey: ['maintenance_requests', statusFilter, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      try {
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
            user_id
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
    enabled: !!organizationId && !!accountId
  });

  const handleEdit = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <MaintenanceHeader onAddRequest={() => setIsAddDrawerOpen(true)} />
          <MaintenanceStatsCards />

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <MaintenanceTable
              maintenanceRequests={maintenanceRequests}
              onEdit={handleEdit}
              onViewDetails={handleViewDetails}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
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