import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Site } from "@/types/site";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { getSiteColumns } from "./table/SiteTableColumns";
import { useOrganization } from "@/hooks/use-organization";

interface SiteTableProps {
  onEdit?: (site: Site) => void;
}

export function SiteTable({ onEdit }: SiteTableProps) {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();

  const { data: sites = [], isLoading, refetch } = useQuery({
    queryKey: ['sites', organizationId, accountId],
    queryFn: async () => {
      // Only fetch if we have both IDs
      if (!organizationId || !accountId) {
        console.log('Missing organization or account ID');
        return [];
      }

      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching sites:', error);
        toast.error("Failed to fetch sites");
        return [];
      }

      return data as Site[];
    },
    enabled: !!organizationId && !!accountId // Only run query if we have both IDs
  });

  const handleDelete = async (site: Site) => {
    if (!organizationId || !accountId) {
      toast.error("Missing organization or account ID");
      return;
    }

    try {
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', site.id)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;

      toast.success("Site deleted successfully");
      refetch();
    } catch (error) {
      console.error('Error deleting site:', error);
      toast.error("Failed to delete site");
    }
  };

  const handleEdit = (site: Site) => {
    setSelectedSite(site);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (site: Site) => {
    console.log('View details for site:', site);
    toast.info("Site Detail Page coming soon!");
  };

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Available", value: "available" },
    { label: "Occupied", value: "occupied" },
    { label: "Maintenance", value: "maintenance" }
  ];

  const siteFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true, 
      options: [
        { value: 'available', label: 'Available' },
        { value: 'occupied', label: 'Occupied' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    },
    { name: 'length_ft', label: 'Length (ft)', type: 'number' as const },
    { name: 'width_ft', label: 'Width (ft)', type: 'number' as const },
    { 
      name: 'is_covered', 
      label: 'Is Covered', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { 
      name: 'has_water', 
      label: 'Has Water', 
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { name: 'electricity_voltage', label: 'Electricity Voltage', type: 'text' as const },
  ];

  if (!organizationId || !accountId) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Unable to load sites. Please ensure you're properly logged in.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={sites}
          columns={getSiteColumns()}
          isLoading={isLoading}
          tableName="sites"
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: "all",
              onChange: () => {},
            }
          ]}
        />

        <EntityDrawer
          entity={selectedSite}
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedSite(null);
          }}
          onEntityUpdated={() => {
            refetch();
            setIsDrawerOpen(false);
            setSelectedSite(null);
          }}
          title="Site"
          fields={siteFields}
          tableName="sites"
        />
      </div>
    </div>
  );
}