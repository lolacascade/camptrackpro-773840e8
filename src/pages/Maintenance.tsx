import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MaintenanceDrawer } from "@/components/maintenance/MaintenanceDrawer";
import { AddMaintenanceDialog } from "@/components/maintenance/AddMaintenanceDialog";
import { Maintenance as MaintenanceType } from "@/types/maintenance";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Column } from "@/components/common/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { PageWithChat } from "@/components/layout/PageWithChat";

export default function Maintenance() {
  const { toast } = useToast();
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { data: maintenanceRequests = [], isLoading, refetch } = useQuery({
    queryKey: ['maintenance_requests', statusFilter, priorityFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from('maintenance_requests')
          .select(`
            id,
            title,
            description,
            status,
            priority,
            created_at,
            asset_id,
            assets (
              id,
              asset_name
            )
          `);

        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }

        if (priorityFilter !== 'all') {
          query = query.eq('priority', priorityFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching maintenance requests:', error);
          throw error;
        }

        return data || [];
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
  });

  const columns: Column<MaintenanceType>[] = [
    {
      header: "Title",
      accessorKey: "title",
      sortable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (maintenance) => (
        <Badge variant={
          maintenance.status === 'completed' ? 'default' :
          maintenance.status === 'in_progress' ? 'secondary' :
          'outline'
        }>
          {maintenance.status.replace('_', ' ')}
        </Badge>
      ),
      sortable: true,
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (maintenance) => (
        <Badge variant={
          maintenance.priority === 'high' ? 'destructive' :
          maintenance.priority === 'medium' ? 'secondary' :
          'outline'
        }>
          {maintenance.priority}
        </Badge>
      ),
      sortable: true,
    },
    {
      header: "Asset",
      accessorKey: "assets",
      cell: (maintenance) => maintenance.assets?.asset_name || 'Unassigned',
      sortable: true,
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: (maintenance) => new Date(maintenance.created_at).toLocaleDateString(),
      sortable: true,
    },
  ];

  const filters = [
    {
      name: "status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    },
    {
      name: "priority",
      options: [
        { label: "All Priorities", value: "all" },
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "low" }
      ],
      value: priorityFilter,
      onChange: setPriorityFilter
    }
  ];

  const handleEdit = (maintenance: MaintenanceType) => {
    setSelectedMaintenance(maintenance);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (maintenance: MaintenanceType) => {
    setSelectedMaintenance(maintenance);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DataTable
            data={maintenanceRequests}
            columns={columns}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
            title="Maintenance Requests"
            filters={filters}
            headerContent={
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Request
              </Button>
            }
          />
        )}

        <AddMaintenanceDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
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
    </PageWithChat>
  );
}