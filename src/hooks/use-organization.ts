
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
      const { data, error } = await supabase
        .rpc('get_user_roles', { user_id: session.user.id });

      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }

      if (!data?.organization_id || !data?.account_id) {
        console.error("No organization or account found for user");
        navigate('/signin');
        throw new Error("No organization or account found for user");
      }

      console.log('Found organization context:', {
        organizationId: data.organization_id,
        accountId: data.account_id,
        orgRole: data.org_role,
        accountRole: data.account_role
      });

      return {
        organizationId: data.organization_id,
        accountId: data.account_id,
        orgRole: data.org_role,
        accountRole: data.account_role
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
