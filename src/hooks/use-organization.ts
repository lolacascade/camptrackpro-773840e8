
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

interface RpcUserRolesResult {
  organization_id: string;
  account_id: string;
  org_role: string;
  account_role: string;
}

export function useOrganization() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context', session?.user?.id],
    queryFn: async () => {
      if (!session?.user) {
        throw new Error("No session found");
      }

      console.log('Fetching organization context for user:', session.user.id);

      const { data, error } = await supabase
        .from('organization_roles')
        .select(`
          organization_id,
          role as org_role,
          accounts!inner(
            id as account_id,
            account_roles!inner(
              role as account_role
            )
          )
        `)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }

      if (!data?.organization_id || !data.accounts?.[0]?.account_id) {
        console.error("No organization or account found for user");
        navigate('/signin');
        throw new Error("No organization or account found for user");
      }

      const userRoles: RpcUserRolesResult = {
        organization_id: data.organization_id,
        account_id: data.accounts[0].account_id,
        org_role: data.org_role,
        account_role: data.accounts[0].account_roles[0].account_role
      };

      console.log('Found organization context:', {
        organizationId: userRoles.organization_id,
        accountId: userRoles.account_id,
        orgRole: userRoles.org_role,
        accountRole: userRoles.account_role
      });

      return {
        organizationId: userRoles.organization_id,
        accountId: userRoles.account_id,
        orgRole: userRoles.org_role,
        accountRole: userRoles.account_role
      };
    },
    enabled: !!session?.user?.id,
    staleTime: 30000, // Cache for 30 seconds
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    orgRole: data?.orgRole,
    accountRole: data?.accountRole,
    isLoading,
    error: error as Error | null
  };
}
