
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";
import { getSiteColumns } from "./table/SiteTableColumns";

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

  const handleViewDetails = (site: any) => {
    // Implement view details functionality
    console.log('View site details:', site);
  };

  const handleEdit = (site: any) => {
    // Implement edit functionality
    console.log('Edit site:', site);
  };

  const handleDelete = async (site: any) => {
    try {
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', site.id)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      toast.success('Site deleted successfully');
    } catch (error) {
      console.error('Error deleting site:', error);
      toast.error('Failed to delete site');
    }
  };

  return (
    <DataTable
      data={sites}
      columns={getSiteColumns()}
      isLoading={isLoading}
      title="Sitemap"
      tableName="sites"
      onViewDetails={handleViewDetails}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
