
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useOrganization() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context'],
    queryFn: async () => {
      console.log('Fetching organization context...');
      
      // Get current session and user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log('No active session found, redirecting to login');
        navigate('/signin');
        return null;
      }

      // Get organization role for current user
      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (orgError) {
        console.error('Error fetching organization:', orgError);
        toast.error("Failed to fetch organization context");
        return null;
      }

      if (!orgRoles?.organization_id) {
        console.error('No organization found');
        return null;
      }

      console.log('Found organization:', orgRoles);

      // Get account role for current user
      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (accError) {
        console.error('Error fetching account:', accError);
        toast.error("Failed to fetch account context");
        return null;
      }

      if (!accRoles?.account_id) {
        console.error('No account found');
        return null;
      }

      console.log('Found account:', accRoles);

      return {
        organizationId: orgRoles.organization_id,
        accountId: accRoles.account_id
      };
    },
    retry: false
  });

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    isLoading,
    error
  };
}
