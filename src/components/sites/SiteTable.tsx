import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Site } from "@/types/site";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { getSiteColumns } from "./table/SiteTableColumns";
import { useOrganization } from "@/hooks/use-organization";

export function SiteTable() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();

  const { data: sites = [], isLoading, refetch } = useQuery({
    queryKey: ['sites', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return [];

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
    enabled: !!organizationId && !!accountId
  });

  const handleDelete = async (site: Site) => {
    try {
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', site.id);

      if (error) throw error;

      toast.success("Site deleted successfully");
      refetch();
    } catch (error) {
      console.error('Error deleting site:', error);
      toast.error("Failed to delete site");
    }
  };

  const siteFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const,
      options: [
        { value: 'available', label: 'Available' },
        { value: 'occupied', label: 'Occupied' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    },
    { name: 'location_identifier', label: 'Location', type: 'text' as const },
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

  return (
    <div className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={sites}
          columns={getSiteColumns()}
          isLoading={isLoading}
          tableName="sites"
          onEdit={(site) => {
            setSelectedSite(site);
            setIsDrawerOpen(true);
          }}
          onDelete={handleDelete}
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