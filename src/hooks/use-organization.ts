
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface UserRoles {
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

      // Get organization and account roles in a single query
      const { data: userRoles, error } = await supabase
        .rpc<UserRoles>('get_user_roles', { user_id: session.user.id })
        .single();

      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }

      if (!userRoles?.organization_id || !userRoles?.account_id) {
        console.error("No organization or account found for user");
        navigate('/signin');
        throw new Error("No organization or account found for user");
      }

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
