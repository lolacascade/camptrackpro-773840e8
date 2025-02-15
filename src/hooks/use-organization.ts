
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

type AccountRole = Database['public']['Tables']['account_roles']['Row'];
type OrganizationRole = Database['public']['Tables']['organization_roles']['Row'];

interface RpcUserRolesResult {
  organization_id: string;
  account_id: string;
  org_role: string;
  account_role: string;
}

type OrganizationRoleWithAccounts = OrganizationRole & {
  account_roles: AccountRole[];
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

      const { data: orgData, error } = await supabase
        .from('organization_roles')
        .select(`
          organization_id,
          role,
          account_roles (
            account_id,
            role
          )
        `)
        .eq('user_id', session.user.id)
        .returns<OrganizationRoleWithAccounts>()
        .maybeSingle();

      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }

      if (!orgData || !orgData.account_roles?.[0]) {
        console.error("No organization or account found for user");
        navigate('/signin');
        throw new Error("No organization or account found for user");
      }

      const userRoles: RpcUserRolesResult = {
        organization_id: orgData.organization_id,
        account_id: orgData.account_roles[0].account_id || '',
        org_role: orgData.role,
        account_role: orgData.account_roles[0].role
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
