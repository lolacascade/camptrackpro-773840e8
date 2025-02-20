
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MaintenanceDrawer } from "@/components/maintenance/MaintenanceDrawer";
import { AddMaintenanceDrawer } from "@/components/maintenance/AddMaintenanceDrawer";
import { MaintenanceStatsCards } from "@/components/maintenance/insights/MaintenanceStatsCards";
import { MaintenanceHeader } from "@/components/maintenance/MaintenanceHeader";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import type { Maintenance } from "@/types/maintenance";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";

const FILTER_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" }
] as const;

export default function Maintenance() {
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const { organizationId, accountId } = useOrganization();

  const { data: maintenanceRequests = [], isLoading, refetch } = useQuery({
    queryKey: ['maintenance_requests', statusFilter, organizationId, accountId],
    queryFn: async () => {
      try {
        console.log('Fetching maintenance requests with:', { organizationId, accountId, statusFilter });
        
        // Commenting out maintenance requests query until table is created
        // let query = supabase
        //   .from('maintenance_requests')
        //   .select(`
        //     *,
        //     site:sites(
        //       id,
        //       name,
        //       status
        //     )
        //   `);

        // if (organizationId) {
        //   query = query.eq('organization_id', organizationId);
        // }
        // if (accountId) {
        //   query = query.eq('account_id', accountId);
        // }
        // if (statusFilter !== 'all') {
        //   query = query.eq('status', statusFilter);
        // }

        // const { data, error } = await query;

        // if (error) {
        //   console.error('Error fetching maintenance requests:', error);
        //   throw error;
        // }

        // console.log('Fetched maintenance requests:', data);
        // return data as Maintenance[];
        return [];
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        toast.error("Failed to load maintenance requests");
        return [];
      }
    },
    enabled: true,
    retry: 1
  });

  const handleMaintenanceClick = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <MaintenanceHeader onAddRequest={() => setIsAddDrawerOpen(true)} />
          <MaintenanceStatsCards />

          <MaintenanceTable
            maintenanceRequests={maintenanceRequests}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filterOptions={FILTER_OPTIONS}
            onRowClick={handleMaintenanceClick}
          />

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
