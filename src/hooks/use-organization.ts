import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useOrganization() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context'],
    queryFn: async () => {
      console.log('Fetching organization context...');
      
      // Get organization role
      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .single();

      if (orgError) {
        console.error('Error fetching organization:', orgError);
        toast.error("Failed to fetch organization context");
        return { organizationId: undefined, accountId: undefined };
      }

      console.log('Found organization:', orgRoles);

      // Get account role
      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id')
        .single();

      if (accError) {
        console.error('Error fetching account:', accError);
        toast.error("Failed to fetch account context");
        return { organizationId: orgRoles?.organization_id, accountId: undefined };
      }

      console.log('Found account:', accRoles);

      return {
        organizationId: orgRoles?.organization_id,
        accountId: accRoles?.account_id
      };
    }
  });

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    isLoading,
    error
  };
}