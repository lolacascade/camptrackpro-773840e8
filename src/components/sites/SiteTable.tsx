import { DataTable } from "@/components/common/DataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";

export function SiteTable() {
  const { organizationId, accountId } = useOrganization();
  
  console.log('SiteTable - Organization ID:', organizationId);
  console.log('SiteTable - Account ID:', accountId);

  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites', organizationId, accountId],
    queryFn: async () => {
      console.log('Fetching sites with:', { organizationId, accountId });
      
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
        toast.error('Failed to load sites');
        return [];
      }

      console.log('Fetched sites:', data);
      return data || [];
    },
    enabled: !!organizationId && !!accountId
  });

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Location",
      accessorKey: "location_identifier",
    },
    {
      header: "Length (ft)",
      accessorKey: "length_ft",
    },
    {
      header: "Width (ft)",
      accessorKey: "width_ft",
    },
    {
      header: "Covered",
      accessorKey: "is_covered",
      cell: (row: any) => row.is_covered ? "Yes" : "No",
    },
    {
      header: "Water",
      accessorKey: "has_water",
      cell: (row: any) => row.has_water ? "Yes" : "No",
    },
    {
      header: "Electricity",
      accessorKey: "electricity_voltage",
    },
  ];

  return (
    <DataTable
      data={sites}
      columns={columns}
      isLoading={isLoading}
      title="Sitemap"
      tableName="sites"
    />
  );
}