
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

      // First check organization roles
      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id, role')
        .eq('user_id', session.user.id)
        .single();

      if (orgError) {
        console.error("Error fetching organization roles:", orgError);
        throw orgError;
      }

      if (!orgRoles?.organization_id) {
        console.error("No organization_id found for user");
        navigate('/signin');
        throw new Error("No organization_id found for user");
      }

      // Then check account roles
      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id, role')
        .eq('user_id', session.user.id)
        .single();

      if (accError) {
        console.error("Error fetching account roles:", accError);
        throw accError;
      }

      if (!accRoles?.account_id) {
        console.error("No account_id found for user");
        navigate('/signin');
        throw new Error("No account_id found for user");
      }

      console.log('Found organization context:', {
        organizationId: orgRoles.organization_id,
        accountId: accRoles.account_id,
        orgRole: orgRoles.role,
        accountRole: accRoles.role
      });

      return {
        organizationId: orgRoles.organization_id,
        accountId: accRoles.account_id,
        orgRole: orgRoles.role,
        accountRole: accRoles.role
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
