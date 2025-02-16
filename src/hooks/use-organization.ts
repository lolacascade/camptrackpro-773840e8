
import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

type OrganizationRoleRow = Database['public']['Tables']['organization_roles']['Row'];
type AccountRoleRow = Database['public']['Tables']['account_roles']['Row'];

interface OrganizationContextData {
  organizationId: string;
  accountId: string;
  orgRole: string;
  accountRole: string;
}

export function useOrganization() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't run the query on public routes
  const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(location.pathname);

  const { data, isLoading, error } = useQuery<OrganizationContextData>({
    queryKey: ['organization-context'],
    queryFn: async () => {
      if (!session?.user) {
        throw new Error("No session found");
      }

      console.log('Fetching organization context for user:', session.user.id);

      // Explicitly type the response
      type DbResponse = OrganizationRoleRow & {
        account_roles: AccountRoleRow[];
      };

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
        .single() as { data: DbResponse | null; error: any };

      if (error) {
        console.error("Error fetching user roles:", error);
        throw error;
      }

      if (!orgData || !orgData.account_roles?.[0]) {
        throw new Error("No organization or account roles found");
      }

      return {
        organizationId: orgData.organization_id,
        accountId: orgData.account_roles[0].account_id,
        orgRole: orgData.role,
        accountRole: orgData.account_roles[0].role
      };
    },
    enabled: !!session?.user?.id && !isPublicRoute,
    staleTime: 30000,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  // Only navigate if we're not on a public route and have an error
  useEffect(() => {
    if (!isPublicRoute && !isLoading && error) {
      console.log('Organization data fetch failed, redirecting to signin');
      navigate('/signin');
    }
  }, [isLoading, error, navigate, isPublicRoute]);

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    orgRole: data?.orgRole,
    accountRole: data?.accountRole,
    isLoading: isPublicRoute ? false : isLoading,
    error: isPublicRoute ? null : (error as Error | null)
  };
}
